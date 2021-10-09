// echarts按需引入
// import * as echarts from 'echarts/core'

// import {
//   PieChart,
//   BarChart,
//   LineChart,
//   GaugeChart,
//   PictorialBarChart,
//   ScatterChart,
//   EffectScatterChart
//   //不常用
//   // ParallelChart,
//   // MapChart,
//   // BoxplotChart,
//   // LinesChart,
//   // RadarChart,
//   // SankeyChart,
//   // SunburstChart,
//   // ThemeRiverChart,
//   // CandlestickChart,
//   // TreeChart,
//   // TreemapChart,
//   // CustomChart,
//   // FunnelChart,
//   // GraphChart,
//   // HeatmapChart,
//   // 系列类型的定义后缀都为 SeriesOption
//   // PieSeriesOption,
//   // BarSeriesOption,
//   // LineSeriesOption,
//   // GaugeSeriesOption,
//   // PictorialBarSeriesOption,
//   // ScatterSeriesOption,
//   // EffectScatterSeriesOption
// } from 'echarts/charts'

// import {
//   TitleComponent,
//   LegendComponent,
//   TooltipComponent,
//   GridComponent,
//   DataZoomComponent,
//   DataZoomInsideComponent,
//   DataZoomSliderComponent
//   // 组件类型的定义后缀都为 ComponentOption
//   // TitleComponentOption,
//   // LegendComponentOption,
//   // TooltipComponentOption,
//   // GridComponentOption,
//   // DataZoomComponentOption
// } from 'echarts/components'

// import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
// export type ECOption = echarts.ComposeOption<TitleComponentOption | GridComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption | BarSeriesOption | LineSeriesOption | GaugeSeriesOption | PictorialBarSeriesOption | ScatterSeriesOption | EffectScatterSeriesOption | DataZoomComponentOption>

// 注册必须的组件
// echarts.use([PieChart, BarChart, LineChart, GaugeChart, PictorialBarChart, ScatterChart, EffectScatterChart, CanvasRenderer /*渲染器*/, TitleComponent, LegendComponent, TooltipComponent, GridComponent, DataZoomComponent, DataZoomInsideComponent, DataZoomSliderComponent])

import { defineComponent, h, Ref, ref, toRefs, PropType, watch, onMounted, onUnmounted } from 'vue'

//echarts 全部引入
import * as echarts from 'echarts'
//Option类型提示
import { EChartsOption } from 'echarts/types/dist/shared'
// export { EChartsOption }
export type OptionType = EChartsOption

export default defineComponent({
  name: 'VueEcharts',
  props: {
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    }
  },
  emits: ['updated', 'rendered', 'destroyed'],
  setup(props, { emit }) {
    const chartRef: Ref<HTMLElement | null> = ref(null)
    const { options } = toRefs(props)

    let mychart: echarts.ECharts | null = null

    function resize() {
      console.log('chart size Change')
      mychart?.resize()
    }

    if (options.value) {
      watch(
        options,
        newValue => {
          // console.log('watch options', newValue)
          mychart?.setOption(newValue)
          emit('updated')
        },
        {
          deep: true
        }
      )

      onMounted(() => {
        mychart = echarts.init(chartRef.value as HTMLElement)
        mychart.setOption(options.value)

        window.addEventListener('resize', resize)

        emit('rendered')
      })

      onUnmounted(() => {
        if (mychart) {
          mychart.clear()
          mychart.dispose()
          mychart = null
        }

        window.removeEventListener('resize', resize)

        emit('destroyed')
      })
    } else {
      console.error('请传递渲染函数组件必须的参数')
    }
    return {
      chartRef
    }
  },
  render() {
    return h('div', {
      class: 'vue-echarts',
      ref: 'chartRef',
      style: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }
    })
  }
})
