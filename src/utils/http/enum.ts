/**
 * @description: 请求结果 code
 */
export enum ResCodeEnum {
  SUCCESS = 100000,
  AUTH_NULL = 100033,
  AUTH_EXPIRE = 100035 //token已过期
}

/**
 * @description:  常用的contentType类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // json
  TEXT = 'text/plain;charset=UTF-8',
  // form-data 一般配合qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  上传
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
