<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>
