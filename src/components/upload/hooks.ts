import { mergeFile, uploadFile } from '@/api/upload'
import sparkMD5 from 'spark-md5'

export function bindEvents(drag: HTMLElement, cb: Function) {
  drag.addEventListener('dragover', e => {
    drag.style.borderColor = 'red'
    e.preventDefault()
  })
  drag.addEventListener('dragleave', e => {
    drag.style.borderColor = '#eee'
    e.preventDefault()
  })
  drag.addEventListener('drop', e => {
    const fileList = e.dataTransfer!.files
    drag.style.borderColor = '#eee'
    cb(fileList[0])
    // file.value = fileList[0]
    e.preventDefault()
  })
}

async function blobToString(blob: Blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsBinaryString(blob)

    reader.onload = function () {
      console.log('reader', reader.result)
      const res = (reader.result as string)
        .split('')
        .map(v => v.charCodeAt(0))
        .map(v => v.toString(16).toUpperCase())
        // .map(v=>v.padStart(2,'0'))
        .join(' ')
      resolve(res)
    }
  })
}

export async function isGif(file: File) {
  const res = await blobToString(file.slice(0, 6))
  const isGif = res == '47 49 46 38 39 61' || res == '47 49 46 38 37 61'
  return isGif
}

export async function isPng(file: File) {
  const res = await blobToString(file.slice(0, 8))
  const ispng = res == '89 50 4E 47 0D 0A 1A 0A'
  return ispng
}

export async function isJpg(file: File) {
  const len = file.size
  const start = await blobToString(file.slice(0, 2))
  const end = await blobToString(file.slice(-2, len))
  // console.log('start', start)
  const isjpg = start == 'FF D8' && end == 'FF D9'
  return isjpg
}

export async function isImage(file: File) {
  return (await isGif(file)) || (await isPng(file)) || (await isJpg(file))
}

//文件切片
const CHUNK_SIZE = 10 * 1024 * 1024
export function createFileChunk(file: File, size = CHUNK_SIZE) {
  const chunks = []
  let cur = 0
  while (cur < file.size) {
    chunks.push({ index: cur, file: file.slice(cur, cur + size) })
    cur += size
  }
  return chunks
}

//web worker 计算hash值
export async function calculateHashWorker(chunks: any[], cb: Function) {
  return new Promise(resolve => {
    const worker = new Worker('/src/components/upload/worker.js')
    worker.postMessage({ chunks })
    worker.onmessage = e => {
      const { progress, hash } = e.data
      cb(Number(progress.toFixed(2)))
      if (hash) {
        resolve(hash)
      }
    }
  })
}

//时间切片  利用浏览器空余时间计算
export async function calculateHashIdle(chunks: any[], cb: Function): Promise<string> {
  return new Promise(resolve => {
    const spark = new sparkMD5.ArrayBuffer()
    let count = 0

    const appendToSpark = async (file: File) => {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = e => {
          spark.append(e.target!.result as ArrayBuffer)
          resolve(1)
        }
      })
    }
    const workLoop = async (deadline: any) => {
      // timeRemaining获取当前帧的剩余时间
      while (count < chunks.length && deadline.timeRemaining() > 1) {
        // 空闲时间，且有任务
        await appendToSpark(chunks[count].file)
        count++
        if (count < chunks.length) {
          cb(Number(((100 * count) / chunks.length).toFixed(2)))
        } else {
          cb(100)
          resolve(spark.end())
        }
      }
      window.requestIdleCallback(workLoop)
    }
    // 浏览器一旦空闲，就会调用workLoop
    window.requestIdleCallback(workLoop)
  })
}

//抽样hash
export async function calculateHashSample(file: File, cb: Function) {
  // 布隆过滤器  判断一个数据存在与否
  // 1个G的文件，抽样后5M以内
  // hash一样，文件不一定一样
  // hash不一样，文件一定不一样
  return new Promise(resolve => {
    const spark = new sparkMD5.ArrayBuffer()
    const reader = new FileReader()

    const size = file.size
    const offset = 2 * 1024 * 1024
    // 第一个2M，最后一个区块数据全要
    const chunks = [file.slice(0, offset)]

    let cur = offset
    while (cur < size) {
      if (cur + offset >= size) {
        // 最后一个区快
        chunks.push(file.slice(cur, cur + offset))
      } else {
        // 中间的区块
        const mid = cur + offset / 2
        const end = cur + offset
        chunks.push(file.slice(cur, cur + 2))
        chunks.push(file.slice(mid, mid + 2))
        chunks.push(file.slice(end - 2, end))
      }
      cur += offset
    }
    // 中间的，取前中后各2各字节
    reader.readAsArrayBuffer(new Blob(chunks))
    reader.onload = e => {
      spark.append(e.target!.result as ArrayBuffer)
      cb(100)
      resolve(spark.end())
    }
  })
}

export async function uploadChunks(chunks: any[], uploadedList: any[]) {
  const requests = chunks
    .filter(chunk => uploadedList.indexOf(chunk.name) == -1)
    .map(chunk => {
      // 转成promise
      const form = new FormData()
      form.append('chunk', chunk.chunk)
      form.append('hash', chunk.hash)
      form.append('name', chunk.name)
      // form.append('index',chunk.index)
      return { form, index: chunk.index, error: 0 }
    })
  // .map(({ form, index }) =>
  //   uploadFile(form, (progress: any) => {
  //     // console.log('progress', progress)
  //     chunks[index].progress = Number(
  //       ((progress.loaded / progress.total) * 100).toFixed(2)
  //     )
  //   })
  // )
  //尝试申请tcp链接过多，也会造成卡顿
  // await Promise.all(requests)
  //异步并发数控制
  await sendRequest(requests, chunks)
}

export async function mergeRequest(ext: string, hash: string) {
  const res = await mergeFile({
    ext,
    size: CHUNK_SIZE,
    hash
  })
  console.log('mergeRequest', res)
}

export async function sendRequest(requests: any[], chunks: any[], limit = 5) {
  // limit 并发数
  // 一个数组,长度 limit
  // [task1,task2,task4,task4,task5]
  return new Promise((resolve, reject) => {
    const len = requests.length
    let counter = 0 //已完成任务数
    let isStop = false
    const start = async () => {
      if (isStop) {
        return
      }
      const task = requests.shift()
      if (task) {
        const { form, index } = task

        try {
          await uploadFile(form, (progress: any) => {
            // console.log('progress', progress)
            chunks[index].progress = Number(((progress.loaded / progress.total) * 100).toFixed(2))
          })

          if (counter == len - 1) {
            // 最后一个任务
            resolve(1)
          } else {
            counter++
            // 启动下一个任务
            start()
          }
        } catch (e) {
          // 报错之后，进度条变红，开始重试
          // 一个切片重试失败三次，整体全部终止
          console.error(e)
          chunks[index].progress = -1
          if (task.error < 3) {
            task.error++
            requests.unshift(task)
            start()
          } else {
            // 错误三次
            isStop = true
            reject()
          }
        }
      }
    }

    while (limit > 0) {
      // 启动limit个任务

      // 模拟一下延迟
      setTimeout(() => {
        start()
      }, Math.random() * 2000)
      limit -= 1
    }
  })
}

/**
 * TCP慢启动
 * 默认每个切片上传时间为 100ms (理想时间)
 * 第一个切片大小为 10M
 * 如果第一次时间小于 100ms 则增大第二个切片大小；反之减小第二个切片大小；以此类推
 */
export async function TCPSlowStart(file: File, hash: string) {
  if (!file) {
    return
  }

  const fileSize = file.size
  let offset = 10 * 1024 * 1024
  let cur = 0
  let count = 0
  const forms: any[] = []

  while (cur < fileSize) {
    // 切割offfset大小
    const chunk = file.slice(cur, cur + offset)
    cur += offset
    const chunkName = hash + '-' + count

    const start = new Date().getTime()

    forms[count] = new FormData()
    forms[count].append('chunk', chunk)
    forms[count].append('hash', hash)
    forms[count].append('name', chunkName)
    forms[count].append('size', offset)
    // console.log(
    //   'form',
    //   count,
    //   forms[count].get('chunk'),
    //   forms[count].get('hash'),
    //   forms[count].get('name'),
    //   forms[count].get('size')
    // )

    await uploadFile(forms[count], (progress: any) => {
      console.log('progress', progress)
    })
    const end = new Date().getTime()

    const time = end - start
    const rate = time / 100 //实际用时 是理想用时的 多少倍

    // 新的切片大小等比变化
    console.log(`切片${count}大小是${offset},耗时${time} ms，是100ms的${rate}倍，修正大小为${offset / rate}`)

    // 动态调整offset
    offset = Math.floor(offset / rate)

    count++
  }
}
