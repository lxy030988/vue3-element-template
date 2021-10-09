export interface TParamsLogin {
  account?: string
  userPwd?: string
}
export interface TResUser {
  account: string
  id: string
  token: string
  userName: string
}

export interface TParamsPwd {
  newPassword: string
  oldPassword: string
  repeatPassword: string
}
