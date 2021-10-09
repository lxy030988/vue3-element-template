<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const symbolId = computed(() => `#icon-${props.name}`)
    const svgClass = computed(() => {
      if (props.iconClass) {
        return 'svg-icon ' + props.iconClass
      } else {
        return 'svg-icon'
      }
    })
    return {
      symbolId,
      svgClass
    }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
