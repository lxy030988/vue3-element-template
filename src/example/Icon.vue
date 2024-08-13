<template>
  <div class="tp-full tp-auto--y tp-icon-warp">
    <h1 class="tp-mb--half">图标</h1>
    <div v-for="item in icons" :key="item.tempPath" class="tp-mb--half">
      <div class="tp-icon-content" v-if="item.type">
        <span class="tp-icon-item">
          <span class="tp-icon-name">{{ item.name }}</span>
          <svg-icon :name="item.name" />
        </span>
      </div>
      <template v-else>
        <h2 class="tp-mb--half">文件夹: {{ item.name }}</h2>
        <div class="tp-icon-content">
          <span v-for="i in item.children" :key="i.tempPath" class="tp-icon-item" @click="nCopy(i.name)">
            <span class="tp-icon-name">{{ i.name }}</span>
            <svg-icon :name="i.name" />
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { icons } from 'virtual:icon'
import { useClipboard } from '@vueuse/core'
import { ElNotification } from 'element-plus'
export default defineComponent({
  name: 'ExampleIcon',
  setup() {
    console.log('ExampleIcon setup', icons)
    const source = ref('')
    const { copy } = useClipboard({ source, legacy: true })
    const nCopy = async (name: string) => {
      source.value = `<svg-icon name="${name}" />`
      await copy(source.value)
      ElNotification({
        title: '复制成功',
        message: source.value,
        type: 'success'
      })
    }
    return { icons, nCopy }
  }
})
</script>

<style scoped lang="scss">
.tp-icon-warp {
  padding: $tp-default-dis;
}

.tp-icon-content {
  display: flex;
  flex-wrap: wrap;

  .tp-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    margin: 5px;
    padding: 5px 10px;
    transition: all 0.2s;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #f2f6fc;
    }

    .tp-icon-name {
      width: 100%;
      text-align: center;
      word-break: break-all;
    }
  }
}

.tp-icon {
  margin-top: 5px;
  color: #666;
  font-size: 28px;
}
</style>
