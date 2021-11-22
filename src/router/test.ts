import { RouteRecordRaw } from 'vue-router'
const testRoutes: Array<RouteRecordRaw> = []

if (import.meta.env.VITE_NAME === 'dev') {
  testRoutes.push({
    path: 'dev',
    name: 'dev',
    component: () => import(/* webpackChunkName: "dev" */ '../env/comp/dev.vue'),
    meta: {
      title: 'dev'
    }
  })
} else {
  testRoutes.push({
    path: 'setting/upload',
    name: 'SettingUpload',
    component: () => import(/* webpackChunkName: "upload" */ '../views/Upload/index.vue'),
    meta: {
      title: '文件上传'
    }
  })
}

export default testRoutes
