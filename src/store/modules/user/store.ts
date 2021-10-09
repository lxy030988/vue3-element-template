import { getUser } from '@/utils/storage/user'

export const createState = () => {
  const store = {
    user: getUser()
  }
  return store
}
//类型推导
export type userState = ReturnType<typeof createState>
