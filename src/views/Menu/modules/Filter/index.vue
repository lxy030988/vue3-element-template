<template>
  <el-card class="tp-tabfilter">
    <el-form :inline="true" :model="formState" class="demo-form-inline">
      <el-form-item label="菜单名称">
        <el-input v-model="formState.name" placeholder="请输入" />
      </el-form-item>

      <el-form-item class="tp-fr">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue'

export default defineComponent({
  name: 'MenuFilter',
  emits: ['filter'],
  setup(props, { emit }) {
    const formState = reactive({
      name: ''
    })
    const onSubmit = () => {
      emit('filter', toRaw(formState))
    }
    return {
      formState,
      onSubmit
    }
  }
})
</script>

<style scoped lang="scss"></style>
