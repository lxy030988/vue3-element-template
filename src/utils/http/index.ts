import axios from 'axios'
import qs from 'qs'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

import { ResCodeEnum } from '@/enums/httpEnum'
import { TRes } from './model'
import { getToken } from '../storage/user'

import { ElMessage } from 'element-plus'
import router from '@/router' //只能在setup里用useRouter

//取消重复请求
const CancelToken = axios.CancelToken

const pendingRequest = new Map()

const generateReqKey = (config: AxiosRequestConfig) => {
  const { method, url, params, data } = config
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&')
}

const addPendingRequest = (config: AxiosRequestConfig) => {
  if (!config.cancelToken) {
    const requestKey = generateReqKey(config)
    const source = CancelToken.source()
    config.cancelToken = source.token
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, source.cancel)
      // source.cancel('取消请求')
    }
  }
}

const removePendingRequest = (config: AxiosRequestConfig) => {
  const requestKey = generateReqKey(config)
  if (pendingRequest.has(requestKey)) {
    const cancel = pendingRequest.get(requestKey)
    cancel(`取消请求 ${requestKey}`)
    pendingRequest.delete(requestKey)
  }
}

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 20_000,
  headers: {
    'Content-Security-Policy': 'upgrade-insecure-requests'
  }
})

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers!.token = getToken()!
    removePendingRequest(config)
    addPendingRequest(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res: AxiosResponse<TRes>) => {
    removePendingRequest(res.config)

    if (res.status === 200) {
      if (res.data.code === ResCodeEnum.SUCCESS) {
        return res.data.data
      }
      if (res.data.code === ResCodeEnum.AUTH_EXPIRE) {
        ElMessage.error('您未登录或登录已失效')
        router.push({ path: '/login' })
      } else {
        ElMessage.error(res.data.msg)
        console.error(res.data.msg)
      }
      return Promise.reject(res)
    }
    return Promise.reject(res)
  },
  (err: AxiosError) => {
    removePendingRequest(err.config)
    if (axios.isCancel(err)) {
      console.log('已取消的重复请求：' + err.message)
    }
    return Promise.reject(err)
  }
)

export default http
