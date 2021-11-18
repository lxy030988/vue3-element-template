import type { App } from 'vue'

import '../styles/element/index.scss'

import ElementPlus from 'element-plus'

export function setupElementPlus(app: App<Element>) {
  app.use(ElementPlus)
}
