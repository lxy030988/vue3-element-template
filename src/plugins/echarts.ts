// import type { Plugin, App } from 'vue'
// import VueEcharts from '@/components/echarts'
// const install = (app: App) => {
//   app.component(VueEcharts.name, VueEcharts)
// }
// VueEcharts.install = install
// export default <Plugin>(VueEcharts as unknown)

import type { App } from 'vue'
import VueEcharts from '@/components/echarts'

export function setupVueEcharts(app: App<Element>) {
  app.component(VueEcharts.name, VueEcharts)
}
