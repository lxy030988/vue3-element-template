import http from '@/utils/http'

export function utest() {
  return http.request<any, any>({
    url: '/',
    method: 'GET'
  })
}

export function uploadFile(data: FormData, cb?: Function) {
  return http.request<any, any>({
    url: '/uploadfile',
    method: 'POST',
    data,
    onUploadProgress: progress => {
      cb?.(progress)
    }
  })
}

export function mergeFile(data: any) {
  return http.request<any, any>({
    url: '/mergefile',
    method: 'POST',
    data
  })
}

export function checkFile(data: any) {
  return http.request<any, any>({
    url: '/checkfile',
    method: 'POST',
    data
  })
}
