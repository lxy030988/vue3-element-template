<template>
  <suspense>
    <template #default>
      <upload />
    </template>
    <template #fallback>加载中...</template>
  </suspense>
</template>

<script setup lang="ts">
import upload from '@/components/upload/index.vue'
</script>

<style scoped></style>
