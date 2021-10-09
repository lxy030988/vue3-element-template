<template>
  <div class="sidebar">
    <el-menu
      :default-active="da"
      active-text-color="#ffd04b"
      background-color="#051530"
      text-color="#fff"
      @select="clickMenu"
    >
      <sidebar-item v-for="item in menus" :key="item.id" :item="item" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SidebarItem from './SidebarItem.vue'
import { AuthorizationTypes } from '@/views/AuthorizationManagement/CONST'

const menus = [
  {
    id: 1,
    parentId: 0,
    icon: 'menu-home',
    path: 'home',
    name: '系统首页'
  },
  {
    id: 2,
    parentId: 0,
    icon: 'menu-setting',
    path: 'setting',
    name: '系统设置',
    children: [
      {
        id: 26,
        parentId: 2,
        path: 'plan',
        name: '计划页面'
      },
      {
        id: 27,
        parentId: 2,
        path: 'upload',
        name: '文件上传'
      }
    ]
  }
  // {
  //   id: 3,
  //   parentId: 0,
  //   icon: 'menu-internal-authorization',
  //   path: 'internalAuthorization',
  //   name: '内部授权',
  //   children: [
  //     {
  //       id: 31,
  //       parentId: 3,
  //       path: AuthorizationTypes.INSIDE,
  //       name: '授权管理'
  //     }
  //   ]
  // },
  // {
  //   id: 4,
  //   parentId: 0,
  //   icon: 'menu-outside-authorization',
  //   path: 'outsideAuthorization',
  //   name: '外部授权',
  //   children: [
  //     {
  //       id: 41,
  //       parentId: 4,
  //       path: AuthorizationTypes.OUTSIDE,
  //       name: '授权码管理'
  //     }
  //   ]
  // }
]

export default defineComponent({
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  setup() {
    const state = reactive({
      da: 'home'
    })

    //点击菜单 跳转路由
    const router = useRouter()
    function clickMenu(index: string, indexPath: any[]) {
      // console.log('clickMenu', index, indexPath)
      router.push({ path: '/' + indexPath.join('/') })
    }

    //根据路由设置 默认选中菜单和默认展开的菜单
    const route = useRoute()
    const curs = route.path.slice(1).split('/')
    state.da = curs[curs.length - 1]

    return {
      menus,
      ...toRefs(state),
      clickMenu
    }
  }
})
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
  overflow-y: auto;
  ::v-deep(.svg-icon) {
    margin-right: $jc-default-dis * 0.5;
    font-size: $jc-font-size-large;
  }
  .el-menu {
    height: 100%;
  }
}
</style>
