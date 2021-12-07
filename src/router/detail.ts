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
    children: [
      {
        name: 'MenuDetail',
        path: 'menu/:id',
        component: () => import(/* webpackChunkName: "MenuDetail" */ '@/views/Menu/modules/Detail/index.vue'),
        meta: {
          title: '详情MenuDetail'
        }
      },
      {
        name: 'PlanDetail',
        path: 'plan/:id',
        component: () => import(/* webpackChunkName: "MenuDetail" */ '@/views/Plan/index.vue'),
        meta: {
          title: '详情PlanDetail'
        }
      }
    ]
  }
]
