import { RouteRecordRaw } from 'vue-router'
import { defaultPageConfig, fullPageConfig } from '@/env'
const envName = import.meta.env.VITE_NAME

const envFullPages: Array<RouteRecordRaw> = []
const fullPages = fullPageConfig[envName as string]
if (fullPages?.length) {
  fullPages.forEach(item => {
    envFullPages.push({
      path: item.path,
      name: item.name,
      component: () => import(`../env/${envName}/${item.name}/index.vue`),
      meta: {
        title: item.title
      }
    })
  })
}

const envDefaultPages: Array<RouteRecordRaw> = []
const defaultPages = defaultPageConfig[envName as string]
if (defaultPages?.length) {
  defaultPages.forEach(item => {
    envDefaultPages.push({
      path: item.path,
      name: item.name,
      component: () => import(`../env/${envName}/${item.name}/index.vue`),
      meta: {
        title: item.title
      }
    })
  })
}
export { envDefaultPages, envFullPages }
