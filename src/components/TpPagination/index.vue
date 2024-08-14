<template>
  <el-pagination
    class="tp-pagination"
    @current-change="onChange"
    @size-change="showSizeChange"
    :current-page="pages.pageNum"
    :page-size="pages.pageSize"
    :layout="layout"
    background
    :total="pages.total"
  />
</template>
<script lang="ts">
import { IPage } from '@/hooks/usePage'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'TpPagination',
  props: {
    pages: {
      type: Object as PropType<IPage>,
      required: true
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    }
  },
  emits: ['currentChange', 'sizeChange'],
  setup(props, { emit }) {
    const onChange = (current: number) => {
      emit('currentChange', current)
    }

    const showSizeChange = (pageSize: number) => {
      emit('sizeChange', pageSize)
    }

    return {
      onChange,
      showSizeChange
    }
  }
})
</script>
<style scoped lang="scss">
.tp-pagination {
  justify-content: flex-end;
  margin-bottom: $tp-default-dis;
  padding: 0 $tp-default-dis;

  :deep(.el-icon) {
    color: inherit;
  }
}
</style>
