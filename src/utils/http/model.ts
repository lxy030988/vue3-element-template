import { ResCodeEnum } from './enum'

// interface TResMsg {
//   msgCode: string
//   msgText: string
// }

export interface TRes {
  success: boolean
  code: ResCodeEnum
  data: any
  msg: string
}
