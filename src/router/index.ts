import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@/layouts/default/index.vue'
import FullLayout from '@/layouts/full/index.vue'
import { getToken } from '@/utils/storage/user'
import { exampleRoutes } from '@/example'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'DefaultLayout',
    redirect: 'home',
    component: DefaultLayout,
    children: [
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        name: 'Menu',
        path: 'menu',
        component: () => import('@/views/Menu/index.vue'),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'FullLayout',
    component: FullLayout,
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/Login/index.vue'),
        meta: {
          title: '登录',
          ignore: true
        }
      },
      ...exampleRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  //   // console.log('beforeEach', to)
  document.title = to.meta.title as string

  if (to.meta.ignore || getToken()) {
    next()
  } else {
    next({ path: '/login' })
  }
})

export default router
