import { TMenuListItem } from '@/api/menu/model'
import { ref } from 'vue'

const manageVisible = ref(false)
const manageId = ref('')

const manage = () => {
  manageId.value = ''
  manageVisible.value = true
}

const editRow = (row: any) => {
  console.log('editRow', row)
  manageId.value = row.id
  manageVisible.value = true
}

const closeManageDialog = () => {
  manageVisible.value = false
}

const deleteRow = (row: any) => {
  console.log('deleteRow', row)
}

const sortRow = (row: TMenuListItem, n: number) => {
  const { id, menuSort } = row
  console.log('sortRow', id, menuSort, n)
}

const detailVisible = ref(false)
const detailId = ref('detailId')
const show = (row: any) => {
  console.log('show', row)
  detailId.value += '1'
  detailVisible.value = true
}

export const useTableOperate = {
  manageId,
  editRow,
  deleteRow,
  manageVisible,
  manage,
  sortRow,
  detailVisible,
  show,
  detailId,
  closeManageDialog
}
