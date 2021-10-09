import { ResCodeEnum } from '@/enums/httpEnum'

// interface TResMsg {
//   msgCode: string
//   msgText: string
// }

export interface TRes {
  code: ResCodeEnum
  data: any
  msg: string
}
