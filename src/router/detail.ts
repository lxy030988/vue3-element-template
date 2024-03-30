import { RouteRecordRaw } from 'vue-router'
import DetailContainer from '@/layouts/detailContainer/index.vue'

export const detailRoutes: Array<RouteRecordRaw> = [
  {
    path: 'detail',
    name: 'DetailContainer',
    redirect: '/',
    component: DetailContainer,
    meta: {
      title: '详情'
    },
    children: []
  }
]
