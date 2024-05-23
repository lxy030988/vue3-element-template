import MyEnum from '@/utils/enum'

//菜单状态
export enum MEMU_STATES {
  ENABLE = 0, //启用
  DISABLE = 1 //停用
}

//菜单类型
export const MEMU_TYPES = new MyEnum([
  { key: 'CATALOGUE', value: 0, label: '目录' },
  { key: 'MENU', value: 1, label: '菜单' },
  { key: 'BUTTON', value: 2, label: '按钮' }
])
