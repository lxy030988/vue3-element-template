import type { App } from 'vue'

import Pagination from '@/components/pagination/index.vue'

const components = [Pagination]

export function setupComponents(app: App<Element>) {
  components.forEach(item => {
    app.component(item.name, item)
  })
}
