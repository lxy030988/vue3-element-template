import { RouteRecordRaw } from 'vue-router'
export const exampleRoutes: Array<RouteRecordRaw> = [
  {
    path: 'example/icon',
    name: 'ExampleIcon',
    component: () => import('./Icon.vue'),
    meta: {
      title: 'ExampleIcon',
      ignore: true
    }
  },
  {
    path: 'example/echarts-gl-map',
    name: 'ExampleEchartsGlMap',
    component: () => import('./EchartsGlMap.vue'),
    meta: {
      title: 'ExampleEchartsGlMap',
      ignore: true
    }
  },
  {
    path: 'example/upload',
    name: 'ExampleUpload',
    component: () => import('./Upload.vue'),
    meta: {
      title: 'ExampleUpload',
      ignore: true
    }
  }
]
