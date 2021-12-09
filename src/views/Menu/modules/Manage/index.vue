<template>
  <el-form :model="formState">
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
    <el-form-item class="el-form-item-footer">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { TMenuListItem } from '@/api/menu/model'
import { defineComponent, reactive, toRaw, watch, PropType, ref } from 'vue'
import { bus } from '@/utils/eventBus'

export default defineComponent({
  name: 'MenuManage',
  props: {
    manageId: {
      type: String,
      default: null
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    console.log('setup MenuManage')
    const formState = reactive({
      name: '',
      enable: false
    })
    const title = ref('新增')

    const onSubmit = () => {
      // toRaw(formState)
      emit('close')
      bus.emit('init-data-menu')
    }
    const resetForm = () => {
      emit('close')
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
