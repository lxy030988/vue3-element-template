<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/setting/plan' }">promotion management</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/setting/plan' }">promotion list</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/login' }">promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BreadCrumb',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="scss">
.el-breadcrumb {
  background: $jc-color-white;
  height: 40px;
  line-height: 40px;
  margin-bottom: $jc-default-dis;
  padding: 0 $jc-default-dis;
}
</style>
