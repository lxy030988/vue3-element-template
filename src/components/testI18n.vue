<template>
  <div>script setup</div>
  <img :src="logo" alt="" />

  <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.title }}
    </li>
  </ul>

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
import logo from '@/assets/logo.png'
import { computed, getCurrentInstance, reactive, ref } from 'vue'

type c = {
  id: number
  title: string
}

const list = reactive<c[]>([{ id: 1, title: 'aaa' }])

const ins = getCurrentInstance()
function useI18n() {
  const locale = ref('en')
  const i18n = (ins?.type as any).i18n
  const t = key => {
    return computed(() => i18n[locale.value][key]).value
  }
  return { locale, t }
}

const { locale, t } = useI18n()
</script>

<style lang="scss" scoped></style>
