import { userState } from './store'

const moduleGetters = {
  isTest: (state: userState): number => {
    return 111
  }
}
export default moduleGetters
