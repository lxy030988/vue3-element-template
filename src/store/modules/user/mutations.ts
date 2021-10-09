import { TResUser } from '@/api/user/model'
import { setToken, setUser } from '@/utils/storage/user'
import { MutationsTypes } from './constant'
import { userState } from './store'

const mutations = {
  [MutationsTypes.SET_USER](state: userState, payload: TResUser | null): void {
    console.log('mutations执行成功')
    state.user = payload
    setUser(payload)
    setToken(payload?.token || '')
  }
}
export default mutations
