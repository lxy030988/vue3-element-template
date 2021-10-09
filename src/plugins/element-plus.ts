import type { App } from 'vue'

import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'

export function setupElementPlus(app: App<Element>) {
  app.use(ElementPlus)
}
