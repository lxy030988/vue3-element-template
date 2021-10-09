import { ActionContext } from 'vuex'
import { MutationsTypes } from './constant'
import { userState } from './store'

export default {
  [MutationsTypes.SET_USER]({ commit }: ActionContext<userState, unknown>, payload: any): void {
    console.log('action执行成功')
    setTimeout(() => {
      // const payload = false
      commit(MutationsTypes.SET_USER, payload)
    }, 2000)
  }
}
