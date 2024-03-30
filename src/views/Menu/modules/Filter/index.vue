<template>
  <div class="tp-card tp-search-warp tp-mb--half">
    <el-form :inline="true" :model="formState" ref="formRef">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="formState.name" placeholder="请输入" />
      </el-form-item>

      <el-form-item class="tp-fr">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, ref } from 'vue'

export default defineComponent({
  name: 'MenuFilter',
  emits: ['filter'],
  setup(props, { emit }) {
    const formState = reactive({
      name: ''
    })

    const formRef = ref()

    const reset = () => {
      formRef.value.resetFields()
    }
    const onSubmit = () => {
      emit('filter', toRaw(formState))
    }
    return {
      formRef,
      reset,
      formState,
      onSubmit
    }
  }
})
</script>

<style scoped lang="scss"></style>
