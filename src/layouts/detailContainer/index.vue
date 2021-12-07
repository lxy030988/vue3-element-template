<template>
  <el-card class="jc-detail-card">
    <template #header>
      <el-icon><arrow-left-bold /></el-icon>
      <span class="jc-detail-card-title">详情</span>
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
import { useRoute } from 'vue-router'
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
    return { detailId }
  }
})
</script>
