import { RouteRecordRaw } from 'vue-router'
export const exampleRoutes: Array<RouteRecordRaw> = [
  {
    path: 'example/echarts-gl-map',
    name: 'ExampleEchartsGlMap',
    component: () => import(/* webpackChunkName: "EchartsGl" */ './EchartsGlMap.vue'),
    meta: {
      title: 'ExampleEchartsGlMap'
    }
  },
  {
    path: 'example/upload',
    name: 'ExampleUpload',
    component: () => import(/* webpackChunkName: "Upload" */ './Upload.vue'),
    meta: {
      title: 'ExampleUpload'
    }
  }
]
