<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    :background-color="bgColor"
    text-color="rgba(255,255,255,0.7)"
    active-text-color="#fff"
  >
    <el-menu-item index="1">
      <svg-icon name="menu-home" />
      <span>系统首页</span>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <svg-icon name="menu-setting" />
        <span>系统设置</span>
      </template>
      <el-menu-item index="2-2">
        <svg-icon name="menu-setting" />
        <span>菜单管理</span>
      </el-menu-item>
      <el-menu-item index="2-1">
        <svg-icon name="menu-setting" />
        <span>组织管理</span>
      </el-menu-item>
      <el-menu-item index="2-3">
        <svg-icon name="menu-setting" />
        <span>角色管理</span>
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="3">
      <svg-icon name="menu-internal-authorization" />
      <span>项目管理</span>
    </el-menu-item>
    <el-menu-item index="4">
      <svg-icon name="menu-outside-authorization" />
      <span>数据采集</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { themes } from '@/styles/theme'
const themeName = import.meta.env.VITE_THEME as string

export default defineComponent({
  name: 'MyMenu',
  setup() {
    // console.log('variables', variables)

    const activeIndex = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    return {
      activeIndex,
      handleSelect,
      bgColor: themes[themeName]
    }
  }
})
</script>
<style lang="scss" scoped>
@mixin active-after {
  &::after {
    content: '';
    width: 50%;
    border-radius: $tp-border-radius-base;
    height: 4px;
    background-color: white;
    position: absolute;
    bottom: -($tp-header-height - 60) * 0.5;
    left: 25%;
  }
}

.el-menu {
  border-bottom: none;

  .el-menu-item {
    font-size: $tp-font-size-medium;
    border: none;

    &.is-active {
      @include active-after;
    }

    &:focus {
      background-color: $tp-color-primary;
    }
  }

  ::v-deep(.el-sub-menu) {
    .el-sub-menu__title {
      font-size: $tp-font-size-medium;
      border: none;
    }
    &.is-active .el-sub-menu__title {
      @include active-after;
    }
  }

  .svg-icon {
    margin-right: $tp-default-dis * 0.5;
  }
}

::v-global(.el-menu--popup .el-menu-item.is-active::after) {
  content: none !important;
}
</style>
