export interface TPageRes<T> {
  pageNum: number
  pageSize: number
  list: T[]
  total: number
}
