<template>
  <el-card class="jc-detail-card">
    <template #header>
      <div class="jc-detail-card-title">
        <el-icon @click="back"><arrow-left-bold /></el-icon>
        <span>详情</span>
      </div>
    </template>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :detailId="detailId" />
      </keep-alive>
    </router-view>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons'
export default defineComponent({
  name: 'DetailContainer',
  components: { ArrowLeftBold },
  setup() {
    const route = useRoute()
    // console.log('route', route.params)

    const detailId = ref(route.params.id)
    watchEffect(() => {
      // console.log('watchEffect', route.params)
      detailId.value = route.params.id
    })

    const router = useRouter()
    const back = () => {
      router.back()
    }
    return { detailId, back }
  }
})
</script>
<style lang="scss" scoped>
.el-icon {
  color: $jc-text-color-secondary;
  font-size: inherit;
  margin-right: $jc-default-dis * 0.5;
  position: relative;
  top: 2px;
  cursor: pointer;
}
</style>
