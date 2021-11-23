<template>
  <h1>testI18n</h1>

  <div>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="zh">zh</option>
    </select>
    <p>{{ t('hello') }}</p>
  </div>
</template>

<i18n>
{
  "en":{
    "language":"labguage",
    "hello":"hello,word"
  },
  "zh":{
    "language":"语言",
    "hello":"你好"
  }
}
</i18n>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'

const ins = getCurrentInstance()
function useI18n() {
  const locale = ref('en')
  const i18n = (ins?.type as any).i18n
  const t = (key: string) => {
    return computed(() => i18n[locale.value][key]).value
  }
  return { locale, t }
}

const { locale, t } = useI18n()
</script>

<style lang="scss" scoped></style>
