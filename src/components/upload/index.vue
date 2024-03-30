<template>
  <div>
    <h1>upload</h1>
  </div>
  <div ref="drag" class="drag">
    <!-- accept="image/*" -->
    <input type="file" name="file" @change="handleFileChange" />
  </div>
  <div>
    <div>计算hash进度</div>
    <a-progress :percent="hashProgress" />
  </div>
  <div>
    <div>文件上传进度</div>
    <a-progress :percent="progressPercent" />
  </div>
  <div>
    <el-button type="primary" @click="uploadBtn">上传</el-button>
  </div>
  <div>
    <!-- chunk.progress 
      <0  报错 显示红色
      100 成功 显示绿色
      0-100 上传中 小方块(切片)高度 -->
    <div class="cube-container">
      <div v-for="chunk in uploadedChunks" :key="chunk.name" class="cube">
        <div
          :class="{
            uploading: chunk.progress > 0 && chunk.progress < 100,
            success: chunk.progress == 100,
            error: chunk.progress < 0
          }"
          :style="{ height: chunk.progress + '%' }"
        >
          <div v-if="chunk.progress < 100 && chunk.progress > 0">loading</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, Ref, ref, toRefs } from 'vue'

import { utest, uploadFile, checkFile } from '@/api/upload'

import { bindEvents, isImage, createFileChunk, calculateHashIdle, mergeRequest, TCPSlowStart } from './hooks'

export default defineComponent({
  async setup() {
    // let progressPercent = ref(0)
    const hashProgress = ref(0)
    // eslint-disable-next-line no-undef
    const file: Ref<Nullable<File>> = ref(null)
    const hash = ref('')
    const state = reactive<any>({ uploadedChunks: [] })

    const cubeWidth = computed(() => {
      return Math.ceil(Math.sqrt(state.uploadedChunks.length)) * 30 + 'px'
    })

    const progressPercent = computed(() => {
      if (!file.value || !state.uploadedChunks.length) {
        return 0
      }
      const loaded = state.uploadedChunks
        .map((item: any) => item.chunk.size * item.progress)
        .reduce((acc: any, cur: any) => acc + cur, 0)
      // console.log('progressPercent computed', loaded, file.value.size)
      return parseInt((loaded / file.value.size).toFixed(2))
    })

    async function handleFileChange(e: any) {
      const target: HTMLInputElement = e.target
      file.value = target.files![0]
      const res = await isImage(file.value)
      console.log('handleFileChange', file.value, res)
    }

    async function uploadBtn() {
      console.log('uploadBtn', file.value)

      const chunks = createFileChunk(file.value!)
      console.log('chunks', chunks)

      // const hash0 = await calculateHashWorker(chunks, (progress: any) => {
      //   // console.log('hash progress', progress)
      //   hashProgress.value = progress
      // })
      // console.log('hash0', hash0)

      const start = new Date().getTime()
      const hash1 = await calculateHashIdle(chunks, (progress: any) => {
        // console.log('hash progress', progress)
        hashProgress.value = progress
      })
      const end = new Date().getTime()

      console.log('hash1', hash1, end - start)

      // const hash2 = await calculateHashSample(file.value!, (progress: any) => {
      //   // console.log('hash progress', progress)
      //   hashProgress.value = progress
      // })
      // console.log('hash2', hash2)
      hash.value = hash1

      const ext = (file.value!.name as any).split('.').pop() //文件后缀名

      //1.检查文件是否已存在
      //2.文件不存在,是否有存在的切片
      const { uploaded, uploadedList } = await checkFile({ hash: hash1, ext })
      if (uploaded) {
        console.log('秒传成功')
        return
      }

      state.uploadedChunks = chunks.map((chunk, index) => {
        // 切片的名字 hash+index
        const name = hash1 + '-' + index
        const progress = uploadedList.indexOf(name) > -1 ? 100 : 0
        return {
          hash: hash1,
          name,
          index,
          chunk: chunk.file,
          progress
        }
      })
      console.log('uploadedChunks', state.uploadedChunks)
      // await uploadChunks(state.uploadedChunks, uploadedList)
      await TCPSlowStart(file.value!, hash.value)
      await mergeRequest(ext, hash.value)
      const end2 = new Date().getTime()
      console.log('上传时间', end2 - start)

      return

      const form = new FormData()
      form.append('name', 'file')
      form.append('file', file.value as Blob)

      const res = await uploadFile(form, (progress: any) => {
        // console.log('progress', progress)
        progressPercent.value = Number(((progress.loaded / progress.total) * 100).toFixed(2))
      })
      console.log(res)
    }

    const drag = ref<HTMLElement>()

    onMounted(() => {
      bindEvents(drag.value!, (f: File) => {
        file.value = f
      })
    })

    const res = await utest()
    console.log('utest1222', res)

    return {
      handleFileChange,
      uploadBtn,
      drag,
      progressPercent,
      hashProgress,
      // uploadedChunks,
      ...toRefs(state),
      cubeWidth
    }
  }
})
</script>

<style scoped lang="scss">
.drag {
  height: 100px;
  border: 2px dashed #eee;
  text-align: center;
}

.cube-container {
  width: v-bind(cubeWidth);

  .cube {
    width: 28px;
    height: 28px;
    float: left;
    border: 1px black solid;
    background: #eee;
    line-height: 26px;

    & > .success {
      background: green;
    }

    & > .uploading {
      background: blue;
    }

    & > .error {
      background: red;
    }
  }
}
</style>
