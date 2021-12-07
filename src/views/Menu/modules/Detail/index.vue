<template>
  <div> MenuDetail</div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'

export default defineComponent({
  name: 'MenuDetail',
  props: {
    detailId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // console.log('props', props)
    watchEffect(() => {
      console.log('watchEffect props', props.detailId)
    })
    return {}
  }
})
</script>

<style scoped></style>
