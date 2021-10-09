<template>
  <div v-if="!item.hidden">
    <template v-if="item.children">
      <el-sub-menu :index="item.path">
        <template #title>
          <r-item :icon="item.icon" :title="item.name" />
        </template>
        <sidebar-item v-for="child in item.children" :key="child.id" :item="child" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="item.path">
        <r-item :icon="item.icon" :title="item.name" />
      </el-menu-item>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import RItem from './Item'

export default defineComponent({
  name: 'SidebarItem',
  components: { RItem },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
