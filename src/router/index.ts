import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@/layouts/default/index.vue'
import FullLayout from '@/layouts/full/index.vue'
// import { getToken } from '@/utils/storage/user'

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
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
        meta: {
          title: '工作台'
        }
      },
      {
        path: 'setting/plan',
        name: 'SettingPlan',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "plan" */ '../views/Plan/index.vue'),
        meta: {
          title: '计划页面'
        }
      },
      {
        name: 'Menu',
        path: 'menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/Menu/index.vue'),
        meta: {
          title: '菜单管理'
        }
      },
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
  },
  {
    path: '/',
    name: 'FullLayout',
    component: FullLayout,
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
        meta: {
          title: '登录',
          ignore: true
        }
      }
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

  //   if (to.meta.ignore || getToken()) {
  next()
  //   } else {
  //     next({ path: '/login' })
  //   }
})

export default router
