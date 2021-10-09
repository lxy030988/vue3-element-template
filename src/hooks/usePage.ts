import { reactive } from 'vue'

export interface IPage {
  pageNum: number
  pageSize: number
  total: number
}

// fn传入的查询方法名
export const usePage = (fn: Function) => {
  const pages = reactive<IPage>({
    pageNum: 1,
    total: 0,
    pageSize: 10
  })

  const sizeChange = (size: number) => {
    pages.pageNum = 1
    pages.pageSize = size
    fn()
  }

  const currentChange = (page: number) => {
    pages.pageNum = page
    fn()
  }

  const tableIndex = (index: number) => {
    return pages.pageSize * (pages.pageNum - 1) + index + 1
  }

  return {
    pages,
    tableIndex,
    sizeChange,
    currentChange
  }
}
