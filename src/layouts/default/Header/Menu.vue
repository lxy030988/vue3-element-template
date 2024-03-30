<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    router
    @select="handleSelect"
    :background-color="bgColor"
    text-color="rgba(255,255,255,0.7)"
    active-text-color="#fff"
  >
    <el-menu-item index="/home">
      <svg-icon name="menu-home" />
      <span>系统首页</span>
    </el-menu-item>
    <el-menu-item index="/menu">
      <svg-icon name="menu-setting" />
      <span>菜单管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { themes } from '@/styles/theme'
import { useRoute } from 'vue-router'
const themeName = import.meta.env.VITE_THEME as string

export default defineComponent({
  name: 'MyMenu',
  setup() {
    const route = useRoute()
    // console.log('route', route)

    const activeIndex = ref(route.path)
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
    position: absolute;
    bottom: -($tp-header-height - 60) * 0.5;
    left: 25%;
    width: 50%;
    height: 4px;
    border-radius: $tp-border-radius-base;
    background-color: white;
  }
}

.el-menu--horizontal.el-menu {
  border-bottom: none;
  background: none;

  .el-menu-item {
    border: none !important;

    &.is-active {
      @include active-after;
    }

    &:focus {
      background-color: $tp-color-primary;
    }
  }

  :deep(.el-sub-menu) {
    .el-sub-menu__title {
      border: none !important;
      background: none !important;
    }

    &.is-active .el-sub-menu__title {
      @include active-after;
    }
  }
}

:deep(.svg-icon) {
  margin-right: $tp-default-dis * 0.5;
}
</style>
