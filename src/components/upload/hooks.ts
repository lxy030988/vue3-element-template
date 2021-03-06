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

//ๆไปถๅ็
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

//web worker ่ฎก็ฎhashๅผ
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

//ๆถ้ดๅ็  ๅฉ็จๆต่งๅจ็ฉบไฝๆถ้ด่ฎก็ฎ
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
      // timeRemaining่ทๅๅฝๅๅธง็ๅฉไฝๆถ้ด
      while (count < chunks.length && deadline.timeRemaining() > 1) {
        // ็ฉบ้ฒๆถ้ด๏ผไธๆไปปๅก
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
    // ๆต่งๅจไธๆฆ็ฉบ้ฒ๏ผๅฐฑไผ่ฐ็จworkLoop
    window.requestIdleCallback(workLoop)
  })
}

//ๆฝๆ?ทhash
export async function calculateHashSample(file: File, cb: Function) {
  // ๅธ้่ฟๆปคๅจ  ๅคๆญไธไธชๆฐๆฎๅญๅจไธๅฆ
  // 1ไธชG็ๆไปถ๏ผๆฝๆ?ทๅ5Mไปฅๅ
  // hashไธๆ?ท๏ผๆไปถไธไธๅฎไธๆ?ท
  // hashไธไธๆ?ท๏ผๆไปถไธๅฎไธไธๆ?ท
  return new Promise(resolve => {
    const spark = new sparkMD5.ArrayBuffer()
    const reader = new FileReader()

    const size = file.size
    const offset = 2 * 1024 * 1024
    // ็ฌฌไธไธช2M๏ผๆๅไธไธชๅบๅๆฐๆฎๅจ่ฆ
    const chunks = [file.slice(0, offset)]

    let cur = offset
    while (cur < size) {
      if (cur + offset >= size) {
        // ๆๅไธไธชๅบๅฟซ
        chunks.push(file.slice(cur, cur + offset))
      } else {
        // ไธญ้ด็ๅบๅ
        const mid = cur + offset / 2
        const end = cur + offset
        chunks.push(file.slice(cur, cur + 2))
        chunks.push(file.slice(mid, mid + 2))
        chunks.push(file.slice(end - 2, end))
      }
      cur += offset
    }
    // ไธญ้ด็๏ผๅๅไธญๅๅ2ๅๅญ่
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
    .map((chunk, index) => {
      // ่ฝฌๆpromise
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
  //ๅฐ่ฏ็ณ่ฏทtcp้พๆฅ่ฟๅค๏ผไนไผ้?ๆๅก้กฟ
  // await Promise.all(requests)
  //ๅผๆญฅๅนถๅๆฐๆงๅถ
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
  // limit ๅนถๅๆฐ
  // ไธไธชๆฐ็ป,้ฟๅบฆ limit
  // [task1,task2,task4,task4,task5]
  return new Promise((resolve, reject) => {
    const len = requests.length
    let counter = 0 //ๅทฒๅฎๆไปปๅกๆฐ
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
            // ๆๅไธไธชไปปๅก
            resolve(1)
          } else {
            counter++
            // ๅฏๅจไธไธไธชไปปๅก
            start()
          }
        } catch (e) {
          // ๆฅ้ไนๅ๏ผ่ฟๅบฆๆกๅ็บข๏ผๅผๅง้่ฏ
          // ไธไธชๅ็้่ฏๅคฑ่ดฅไธๆฌก๏ผๆดไฝๅจ้จ็ปๆญข
          console.error(e)
          chunks[index].progress = -1
          if (task.error < 3) {
            task.error++
            requests.unshift(task)
            start()
          } else {
            // ้่ฏฏไธๆฌก
            isStop = true
            reject()
          }
        }
      }
    }

    while (limit > 0) {
      // ๅฏๅจlimitไธชไปปๅก

      // ๆจกๆไธไธๅปถ่ฟ
      setTimeout(() => {
        start()
      }, Math.random() * 2000)
      limit -= 1
    }
  })
}

/**
 * TCPๆขๅฏๅจ
 * ้ป่ฎคๆฏไธชๅ็ไธไผ?ๆถ้ดไธบ 100ms (็ๆณๆถ้ด)
 * ็ฌฌไธไธชๅ็ๅคงๅฐไธบ 10M
 * ๅฆๆ็ฌฌไธๆฌกๆถ้ดๅฐไบ 100ms ๅๅขๅคง็ฌฌไบไธชๅ็ๅคงๅฐ๏ผๅไนๅๅฐ็ฌฌไบไธชๅ็ๅคงๅฐ๏ผไปฅๆญค็ฑปๆจ
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
    // ๅๅฒofffsetๅคงๅฐ
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
    const rate = time / 100 //ๅฎ้็จๆถ ๆฏ็ๆณ็จๆถ็ ๅคๅฐๅ

    // ๆฐ็ๅ็ๅคงๅฐ็ญๆฏๅๅ
    console.log(`ๅ็${count}ๅคงๅฐๆฏ${offset},่ๆถ${time} ms๏ผๆฏ100ms็${rate}ๅ๏ผไฟฎๆญฃๅคงๅฐไธบ${offset / rate}`)

    // ๅจๆ่ฐๆดoffset
    offset = Math.floor(offset / rate)

    count++
  }
}
