import axios from 'axios'
import { DownloadingFileType, TDownloadingFile, TParamDownload } from './model'
import { getToken } from '../storage/user'
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { genId } from '../util'

export const downloadHttp = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  responseType: 'blob',
  timeout: 30000 * 1000
})

downloadHttp.interceptors.request.use(
  config => {
    config.headers!.token = getToken()!

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 文件流下载
 * @param content 文件流
 * @param fileName 文件名
 */
export function downloadBlob(content: BlobPart, fileName: string): void {
  const blob = new Blob([content])
  const a = document.createElement('a')

  a.href = URL.createObjectURL(blob)
  a.download = fileName
  a.click()
  URL.revokeObjectURL(a.href)
  a.remove()
}

/**
 * 正在下载的文件
 */
export const downloadingFiles = reactive<TDownloadingFile>({})

const fileTests: Record<number, RegExp> = {
  [DownloadingFileType.WORD]: /\.(doc|docx)$/,
  [DownloadingFileType.EXCEL]: /\.(xlsx|xls|csv)$/,
  [DownloadingFileType.ZIP]: /\.(zip)$/
}

/**
 * 获取文件类型
 * @param name
 */
export const getFileType = (name: string) => {
  for (const type in fileTests) {
    if (fileTests[type].test(name)) {
      return type as any as DownloadingFileType
    }
  }
  return DownloadingFileType.EXCEL
}

/**
 * 文件下载
 * @param fileName 文件名
 * @param url  下载url
 * @param data 参数
 */
export async function download({ fileName, url, data = {} }: TParamDownload): Promise<void> {
  const id = genId()
  const type = getFileType(fileName)
  downloadingFiles[id] = { id, name: fileName, type }

  try {
    const res = await downloadHttp.post(url, data)

    if (res.status === 200) {
      downloadBlob(res.data, fileName)
    } else {
      ElMessage.error('网络请求失败')
    }
  } catch (error) {
    console.error('download', error)
  } finally {
    delete downloadingFiles[id]
  }
}
