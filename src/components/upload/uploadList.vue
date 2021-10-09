<template>
  <div>
    <a-upload
      :file-list="fileList"
      :multiple="false"
      :action="uploadUrl"
      :headers="headers"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <el-button type="primary" :disabled="loading">
        <upload-outlined />
        上传文件
      </el-button>
    </a-upload>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import api from '@/api/api'
import { ResCodeEnum } from '@/enums/httpEnum'
import { getToken } from '@/utils/storage/user'

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: any
  url?: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

export default defineComponent({
  name: 'UploadList',
  props: {
    fileList: {
      type: Array as PropType<FileItem[]>,
      default: () => []
    }
  },
  emits: ['update:fileList'],
  setup(props, { emit }) {
    let loading = ref(false)

    const handleChange = (info: FileInfo) => {
      console.log('handleChange', info.file.status, info)
      if (info.file.status === 'done') {
        loading.value = false
      }

      let resFileList = [...info.fileList]

      resFileList = resFileList.slice(-1)

      resFileList = resFileList.map(file => {
        if (file.response) {
          if (file.response.code === ResCodeEnum.SUCCESS) {
            file.url = file.response.data || ''
          } else {
            // message.error('上传失败')
          }
        }
        return file
      })

      emit('update:fileList', resFileList)
    }

    const beforeUpload = () => {
      loading.value = true
    }

    return {
      uploadUrl: import.meta.env.VITE_BASE_URL + api.file.upload,
      headers: {
        token: getToken()
      },
      loading,
      handleChange,
      beforeUpload
    }
  }
})
</script>
