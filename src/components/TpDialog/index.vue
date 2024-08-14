<template>
  <el-dialog
    :model-value="visible"
    :width="width"
    top="5vh"
    :close-on-click-modal="false"
    append-to-body
    @close="dialogClose"
    :class="customClass"
  >
    <template #header>
      <slot name="title"></slot>
    </template>
    <slot></slot>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

const widths: Record<string, string> = {
  large: '1080px',
  default: '880px',
  small: '680px'
}

export default defineComponent({
  name: 'TpDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    customClass: {
      type: String
    },
    customWidth: {
      type: Number
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const visible = computed(() => props.modelValue)
    const width = computed(() => props.customWidth || widths[props.size])
    const dialogClose = () => {
      emit('update:modelValue', false)
    }
    return { visible, width, dialogClose }
  }
})
</script>
