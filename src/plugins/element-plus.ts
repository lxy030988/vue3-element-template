import type { App } from 'vue'

import '../styles/theme/index.scss'

import ElementPlus from 'element-plus'

export function setupElementPlus(app: App<Element>) {
  app.use(ElementPlus)
}
