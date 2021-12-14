<template>
  <el-pagination
    @current-change="onChange"
    @size-change="showSizeChange"
    :current-page="pages.pageNum"
    :page-size="pages.pageSize"
    layout="total, sizes, prev, pager, next"
    background
    :total="pages.total"
  />
</template>
<script lang="ts">
import { IPage } from '@/hooks/usePage'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'JcPagination',
  props: {
    pages: {
      type: Object as PropType<IPage>,
      required: true
    }
  },
  emits: ['currentChange', 'sizeChange'],
  setup(props, { emit }) {
    const onChange = (current: number) => {
      emit('currentChange', current)
    }

    const showSizeChange = (current: number, pageSize: number) => {
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
.el-pagination {
  // text-align: right;
  margin-top: $jc-default-dis;
  ::v-deep(.el-icon) {
    color: inherit;
  }
}
</style>
