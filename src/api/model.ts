export interface TPageParams {
  pageNum: number
  pageSize: number
  total?: number
}

export interface TPageRes<T> {
  list: T[]
  total: number
}

export enum SwitchType {
  No,
  Yes
}

export interface TBaseItem {
  id: string
  name: string
}
