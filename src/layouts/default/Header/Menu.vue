<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    :background-color="bgColor"
    text-color="rgba(255,255,255,0.7)"
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

const themeName = import.meta.env.VITE_THEME as string

const themes = {
  default: '#1D69E6'
}

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
    border-radius: 4px;
    height: 4px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 25%;
  }
}
.el-menu {
  border-bottom: none;
  .el-menu-item {
    font-size: $jc-font-size-extra-large;
    border: none;
    &.is-active {
      @include active-after;
    }

    //     &:hover,
    //     &:focus {
    //       background-color: transparent;
    //     }
  }
  .el-sub-menu {
    ::v-deep(.el-sub-menu__title) {
      font-size: $jc-font-size-extra-large;
      border: none;
    }

    &.is-active ::v-deep(.el-sub-menu__title) {
      @include active-after;
    }
  }
}
::v-global(.el-menu--popup .el-menu-item.is-active::after) {
  content: none !important;
}
::v-global(.el-popper) {
  border: none !important;
}
</style>
