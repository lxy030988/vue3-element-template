<template>
  <el-dialog :model-value="visible" :title="title" width="600px" @close="resetForm">
    <el-form :model="formState" size="small">
      <el-form-item label="菜单名称">
        <el-input v-model="formState.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-input v-model="formState.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="菜单链接">
        <el-input v-model="formState.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="菜单标识">
        <el-input v-model="formState.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="formState.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-switch v-model="formState.enable" />
      </el-form-item>
      <el-form-item class="text-center">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { TMenuListItem } from '@/api/menu/model'
import { defineComponent, reactive, toRaw, watch, PropType, ref } from 'vue'

export default defineComponent({
  name: 'MenuManage',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object as PropType<TMenuListItem | null>,
      default: null
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    let formState = reactive({
      name: '',
      enable: false
    })
    let title = ref('新增')

    watch(
      () => props.visible,
      value => {
        if (!value) {
          return
        }
        if (props.info) {
          console.log('props.info', props.info)
          title.value = '编辑'
          Object.assign(formState, props.info)
        } else {
          title.value = '新增'
        }
      }
    )

    const onSubmit = () => {
      toRaw(formState)
    }
    const resetForm = () => {
      emit('update:visible', false)
    }
    return {
      title,
      formState,
      onSubmit,
      resetForm
    }
  }
})
</script>

<style scoped lang="scss"></style>
