<template>
  <a-pagination
    :current="pages.pageNum"
    :page-size="pages.pageSize"
    show-quick-jumper
    show-size-changer
    :total="pages.total"
    :show-total="total => `共${total}条`"
    @showSizeChange="showSizeChange"
    @change="onChange"
  />
</template>
<script lang="ts">
import { IPage } from '@/hooks/usePage'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Pagination',
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
.ant-pagination {
  text-align: right;
  margin-top: $jc-default-dis;
}
</style>
