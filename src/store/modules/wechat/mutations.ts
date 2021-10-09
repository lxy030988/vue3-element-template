import { GET_DATA } from './constant'
import { wxState } from './store'

const mutations = {
  [GET_DATA](state: wxState, payload: boolean): void {
    console.log('mutations执行成功')
    state.loading = payload
  }
}
export default mutations
