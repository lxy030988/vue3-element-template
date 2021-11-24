export interface TMenuListParams {
  keyword?: string
  pageNum?: number
  pageSize?: number
}

export interface TMenuListItem {
  id?: string
  name: string
  parentId: string
  menuType: number
  menuSort: number
  menuPath: string
  icon: string
  component: string
  permission: string
  state: number
}
