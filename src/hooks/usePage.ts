import { reactive } from 'vue'

export interface IPage {
  currentPage: number
  pageSize: number
  total: number
}

// fn传入的查询方法名
export const usePage = (fn: Function) => {
  const pages = reactive<IPage>({
    currentPage: 1,
    total: 0,
    pageSize: 10
  })

  const sizeChange = (size: number) => {
    pages.currentPage = 1
    pages.pageSize = size
    fn()
  }

  const currentChange = (page = 1) => {
    pages.currentPage = page
    fn()
  }

  const tableIndex = (index: number) => {
    return pages.pageSize * (pages.currentPage - 1) + index + 1
  }

  return {
    pages,
    tableIndex,
    sizeChange,
    currentChange
  }
}
