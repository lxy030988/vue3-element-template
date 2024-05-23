import { getExportList, getPageList } from '@/api/task'
import { usePage } from '@/hooks'
import { ref } from 'vue'

const loading = ref(false)

const list = ref<any[]>([])
const initData = async () => {
  const res = await getPageList({ ...pages, ...filter.value })
  console.log('initData', res)
  list.value = res.records
  pages.total = res.total
}

//分页
const { pages, tableIndex, currentChange, sizeChange } = usePage(initData)

//搜索
const filter = ref<any>({})
const goFilter = (v: any) => {
  filter.value = v
  currentChange(1)
}

const exportList = async () => {
  await getExportList({ ...filter.value })
}

export const useTableData = {
  loading,
  initData,
  goFilter,
  list,
  pages,
  tableIndex,
  currentChange,
  sizeChange,
  exportList
}
