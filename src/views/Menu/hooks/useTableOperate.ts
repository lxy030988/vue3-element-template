import { TMenuListItem } from '@/api/menu/model'
import { ref } from 'vue'

const manageVisible = ref(false)
const info = ref(null)

const manage = () => {
  info.value = null
  manageVisible.value = true
}

const editRow = (row: any) => {
  console.log('editRow', row)
  info.value = row
  manageVisible.value = true
}

const deleteRow = (row: any) => {
  console.log('deleteRow', row)
}

const sortRow = (row: TMenuListItem, n: number) => {
  const { id, menuSort } = row
  console.log('sortRow', id, menuSort, n)
}

export const useTableOperate = { info, editRow, deleteRow, manageVisible, manage, sortRow }
