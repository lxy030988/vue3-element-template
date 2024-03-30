import http from '@/utils/http'
import api from '../api'
import { TParamsLogin, TResUser, TParamsPwd } from './model'

/**
 * 用户登录
 * @param data
 * @returns
 */
export function getUserInfo(data: TParamsLogin) {
  return http.request<any, TResUser>({
    url: api.user.login,
    method: 'POST',
    data
  })
}

/**
 * 修改密码
 * @param data
 * @returns
 */
export function updatePwd(data: TParamsPwd) {
  return http.request<any, any>({
    url: api.user.updatePwd,
    method: 'POST',
    data
  })
}
