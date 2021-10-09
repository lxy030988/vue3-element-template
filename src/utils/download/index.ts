import axios from 'axios'
import { TParamDownload } from './model'
// import { getToken } from '@/libs/storage'
// import { Message, Loading } from 'element-ui'

const downloadHttp = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  responseType: 'blob',
  timeout: 30000 * 1000,
  headers: {
    // token: getToken()
  }
})

/**
 * 文件流下载
 * @param content 文件流
 * @param fileName 文件名
 */
function downloadBlob(content: BlobPart, fileName: string): void {
  const blob = new Blob([content])
  const a = document.createElement('a')

  a.href = URL.createObjectURL(blob)
  a.download = fileName
  a.click()
  URL.revokeObjectURL(a.href)
  a.remove()
}

/**
 * 文件下载
 * @param fileName 文件名
 * @param url  下载url
 * @param data 参数
 */
export async function download({ fileName, url, data = {} }: TParamDownload): Promise<void> {
  // const loading = Loading.service({ fullscreen: true })

  try {
    const res = await downloadHttp.request({
      url,
      data
    })

    if (res.status === 200) {
      downloadBlob(res.data, fileName)
    } else {
      // Message({ message: '网络请求失败', type: 'error', offset: 20 })
    }
  } catch (error) {
    console.error(error)
  } finally {
    // loading.close()
  }
}
