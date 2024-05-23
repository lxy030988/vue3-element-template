import { download } from '@/utils/download'
import http from '@/utils/http'

/**
 * 列表
 * @param data
 * @returns
 */
export function getPageList(data: any) {
  return http.request<any, any>({
    url: 'page',
    method: 'POST',
    data
  })
}

/**
 * 导出
 * @param data
 * @returns
 */
export function getExportList(data: any) {
  download({ fileName: '各单位生产作业违章明细表.xlsx', url: 'export', data })
  // return http.request<any, any>({
  //   url: 'export',
  //   method: 'POST',
  //   data
  // })
}
