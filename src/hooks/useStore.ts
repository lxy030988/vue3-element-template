import { Commit, CommitOptions, Dispatch, DispatchOptions, useStore } from 'vuex'
import { State } from '@/store'
import { Getters, CommitTypes, DispatchTypes, CommitPayloads, DispatchPayloads } from '@/store/utils'

interface MyCommit {
  (type: CommitTypes, payload: CommitPayloads[CommitTypes], options?: CommitOptions): void
}
interface MyDispatch {
  (type: DispatchTypes, payload?: DispatchPayloads[DispatchTypes], options?: DispatchOptions): Promise<any>
}
interface IUserMyStore {
  state: State
  getters: Getters
  commit: MyCommit & Commit
  dispatch: MyDispatch & Dispatch
}
export const useMyStore = (): IUserMyStore => {
  const { state, getters, commit, dispatch }: IUserMyStore = useStore<State>()
  return { state, getters, commit, dispatch }
}
