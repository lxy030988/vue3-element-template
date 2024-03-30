import { createStore } from 'vuex'
import { modules } from './modules'
import { userState } from './modules/user/store'
type State = {
  user: userState
}

const store = createStore<State>({
  modules
})
export type { State }
export default store
