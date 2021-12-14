<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">
      <svg-icon name="menu-home" />
      <span>工作台</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/detail/menu/1112' }">
      <svg-icon name="menu-setting" />
      <span>系统设置</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/detail/plan/111' }">
      <svg-icon name="menu-setting" />
      <span>菜单管理</span>
    </el-breadcrumb-item>
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
  background: $jc-content-bg-color;
  height: 48px;
  line-height: 48px;
  margin-bottom: $jc-default-dis;
  padding: 0 $jc-default-dis;
  font-size: $jc-font-size-medium;
  box-shadow: inset 0 0px 12px 0 $jc-shadow-color-light;
  border-radius: $jc-border-radius-base;
  ::v-deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      color: $jc-text-color-secondary;
      font-weight: normal;
    }
    &:last-child .el-breadcrumb__inner {
      color: $jc-text-color-primary;
    }
  }

  .svg-icon {
    margin-right: $jc-default-dis * 0.5;
    font-size: $jc-font-size-large;
    position: relative;
    top: -2px;
  }
}
</style>
