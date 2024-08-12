import type { App } from 'vue'

import 'virtual:svg-icons-register'
import SvgIcon from '@/components/Icon/index.vue'

export function setupSvgIcon(app: App<Element>) {
  app.component(SvgIcon.name as string, SvgIcon)
}
