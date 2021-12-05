<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    background-color="#409eff"
    text-color="#fff"
    active-text-color="#fff"
  >
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// import variables from '@/styles/index.scss'
export default defineComponent({
  name: 'Menu',
  setup() {
    // console.log('variables', variables)

    const activeIndex = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      handleSelect
    }
  }
})
</script>
<style lang="scss" scoped>
.el-menu {
  border-bottom: none;
  //   .el-menu-item {
  //     &:hover,
  //     &:focus {
  //       background-color: transparent;
  //     }
  //   }
}
</style>
