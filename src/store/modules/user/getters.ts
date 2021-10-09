import { userState } from './store'

const moduleGetters = {
  isLogin: (state: userState): boolean => {
    return Boolean(state.user)
  }
}
export default moduleGetters
