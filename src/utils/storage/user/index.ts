import { TResUser } from '@/api/user/model'
import { StorageEnum } from '@/enums/storageEnum'
import { localData, storageGet, storageSet } from '..'

export function setToken(token: string) {
  storageSet(StorageEnum.ACCESS_TOKEN, token)
}

export function getToken() {
  return localData.getData(StorageEnum.ACCESS_TOKEN)
}

export function getUser() {
  return storageGet<TResUser>(StorageEnum.USER)
}

export function setUser(info: TResUser | null) {
  storageSet(StorageEnum.USER, info)
}
