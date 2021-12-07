<template>
  <div>
    <div>detail header</div>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :detailId="detailId" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'DetailContainer',
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
