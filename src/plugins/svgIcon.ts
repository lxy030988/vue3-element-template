import type { App } from 'vue'

import 'vite-plugin-svg-icons/register'
import SvgIcon from '@/components/Icon/index.vue'

export function setupSvgIcon(app: App<Element>) {
  app.component(SvgIcon.name, SvgIcon)
}
