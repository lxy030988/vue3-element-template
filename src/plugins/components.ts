import type { App } from 'vue'

import Pagination from '@/components/pagination/index.vue'
import Dialog from '@/components/dialog/index.vue'

const components = [Pagination, Dialog]

export function setupComponents(app: App<Element>) {
  components.forEach(item => {
    app.component(item.name, item)
  })
}
