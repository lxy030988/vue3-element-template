import { RouteRecordRaw } from 'vue-router'
import ManageContainer from '@/layouts/manageContainer/index.vue'

export const manageRoutes: Array<RouteRecordRaw> = [
  {
    path: 'manage',
    name: 'ManageContainer',
    redirect: '/',
    component: ManageContainer,
    meta: {
      title: '新增'
    },
    children: [
      {
        name: 'MenuManage',
        path: 'menu',
        component: () => import(/* webpackChunkName: "MenuManage" */ '@/views/Menu/modules/Manage/index.vue'),
        meta: {
          title: '新增MenuManage'
        }
      }
    ]
  }
]
