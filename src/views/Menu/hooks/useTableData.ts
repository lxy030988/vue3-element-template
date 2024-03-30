import { usePage } from '@/hooks'
import { ref } from 'vue'

const loading = ref(false)

const list = ref<any[]>([
  { name: 'name' },
  { name: 'name' },
  { name: 'name' },
  { name: 'name' },
  { name: 'name' },
  { name: 'name' },
  { name: 'name' },
  { name: 'name' },
  { name: 'name' },
  { name: 'name' }
])
const initData = async () => {
  // const { total, list } = await getPageList({ ...pages, ...filter })
  console.log('initData', filter.value)
  pages.total = 12
}

//分页
const { pages, tableIndex, currentChange, sizeChange } = usePage(initData)

//搜索
const filter = ref<any>({})
const goFilter = (v: any) => {
  filter.value = v
  currentChange(1)
}

export const useTableData = { loading, initData, goFilter, list, pages, tableIndex, currentChange, sizeChange }
