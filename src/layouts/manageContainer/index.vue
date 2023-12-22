<template>
  <el-card class="tp-detail-card">
    <template #header>
      <div class="tp-detail-card-title">
        <el-icon @click="back"><arrow-left-bold /></el-icon>
        <span>新增</span>
      </div>
    </template>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :manageId="manageId" @close="back" />
      </keep-alive>
    </router-view>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, onActivated, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftBold } from '@element-plus/icons'
export default defineComponent({
  name: 'ManageContainer',
  components: { ArrowLeftBold },
  setup() {
    const route = useRoute()
    console.log('route', route.query)

    const manageId = ref(route.query.id)
    watchEffect(() => {
      console.log('ManageContainer watchEffect', route.query)
      manageId.value = route.query.id
    })

    onActivated(() => {
      console.log('ManageContainer onActivated')
    })

    const router = useRouter()
    const back = () => {
      router.back()
    }
    return { manageId, back }
  }
})
</script>
<style lang="scss" scoped>
.el-icon {
  color: $tp-text-color-secondary;
  font-size: inherit;
  margin-right: $tp-default-dis * 0.5;
  position: relative;
  top: 2px;
  cursor: pointer;
}
</style>
