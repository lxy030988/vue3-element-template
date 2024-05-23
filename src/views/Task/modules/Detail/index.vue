<template>
  <div class="tp-detail" v-loading="loading">
    <div class="tp-detail-item">
      <div class="tp-detail-item__label">类型</div>
      <div class="tp-detail-item__content">{{ detailInfo?.bunkTypeName }}</div>
    </div>
    <div class="tp-detail-item">
      <div class="tp-detail-item__label">辖区</div>
      <div class="tp-detail-item__content">{{ detailInfo?.orgAreaName }}</div>
    </div>
    <div class="tp-detail-item">
      <div class="tp-detail-item__label">责任人</div>
      <div class="tp-detail-item__content">{{ detailInfo?.houseOwner }}</div>
    </div>
    <div class="tp-detail-item">
      <div class="tp-detail-item__label">登记人</div>
      <div class="tp-detail-item__content">{{ detailInfo?.registrant }}</div>
    </div>
    <div class="tp-detail-item">
      <div class="tp-detail-item__label">登记时间</div>
      <div class="tp-detail-item__content">{{ formatTime(detailInfo?.registTime) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { formatTime } from '@/utils/util'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'MenuDetail',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detailId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const loading = ref(false)
    const detailInfo = ref()

    const initData = () => {}

    watch(
      () => props.visible,
      n => {
        if (n) {
          initData()
        }
      },
      { immediate: true }
    )

    return { loading, detailInfo, formatTime }
  }
})
</script>

<style scoped></style>
