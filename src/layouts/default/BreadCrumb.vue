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
  height: 48px;
  margin-bottom: $tp-default-dis;
  padding: 0 $tp-default-dis;
  border: 1px solid $tp-border-color-light;
  border-radius: $tp-border-radius-base;
  background: $tp-content-bg-color;
  box-shadow: $tp-box-shadow-light;
  font-size: $tp-font-size-medium;
  line-height: 48px;

  ::v-deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      color: $tp-text-color-secondary;
      font-weight: normal;
    }

    &:last-child .el-breadcrumb__inner {
      color: $tp-text-color-primary;
    }
  }

  .svg-icon {
    position: relative;
    top: -2px;
    margin-right: $tp-default-dis * 0.5;
    font-size: $tp-font-size-large;
  }
}
</style>
