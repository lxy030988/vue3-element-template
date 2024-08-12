import dayjs from 'dayjs'
import arraySupport from 'dayjs/plugin/arraySupport'
import toArray from 'dayjs/plugin/toArray'

/**
 * @param ignore 是否忽略校验值为空
 * @param checkReg 校验类型
 * @param value 校验内容
 */
export interface TCheckOptions {
  ignore: boolean
  checkReg: string | RegExp
  value?: string | null
}

/**
 * 匹配对象
 * @param options
 * @returns
 */
export function check(options: TCheckOptions) {
  options.value = options.value?.trim()
  if (options.value) {
    const reg = typeof options.checkReg === 'string' ? new RegExp(options.checkReg) : options.checkReg //定义匹配

    return reg ? reg.test(options.value) : true
  }
  return options.ignore
}

/**
 * 防抖
 * @param fn
 * @param delay
 * @returns
 */
export function debounce(fn: Function, delay = 400) {
  let timer: any = null

  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流
 * @param fn
 * @param delay
 * @returns
 */
export function throttle(fn: Function, delay = 400) {
  let flag = true
  return function (...args: any[]) {
    if (!flag) {
      return
    }
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}

/**
 * 字符匹配
 * @param search 搜索内容
 * @param content 整体内容
 * @returns 返回匹配正确true | false
 */
export function stringSearch(search = '', content = '') {
  search = search.trim()
  if (search) {
    search = '[' + search.toLowerCase().split('').join('].*[') + ']'
    const reg = new RegExp(search)

    return reg.test(content.toLowerCase())
  }
  return true
}

/**
 * 格式化时间
 * @param t
 */
export function formatTime(t?: number, format = 'YYYY-MM-DD HH:mm:ss') {
  return t ? dayjs(t).format(format) : ''
}

/**
 * 格式化小周期
 * @param t
 */
export function formatTimeSmall(t?: number | null) {
  return t ? dayjs(t).format('YYYY/MM/DD') : ''
}

/**
 * 格式化小周期
 * @param t
 */
export function formatMM(t?: number) {
  return t ? dayjs(t).format('YYYY年MM月') : ''
}
/**
 * 时间比对
 * @param start,end
 */
export function formatTimeList(start: number, end: number) {
  return dayjs(start).format('YYYY-MM-DD') === dayjs(end).format('YYYY-MM-DD')
}
/**
 * 时间转换
 * @param
 */
export function formatTimeData(time: number) {
  if (new Date(time).getFullYear() === new Date().getFullYear()) {
    if (new Date(time).getMonth() === new Date().getMonth()) {
      if (new Date(time).getDate() === new Date().getDate()) {
        return dayjs(time).format('HH:mm')
      } else if (new Date(time).getDate() === new Date().getDate() - 1) {
        return `昨天 ${dayjs(time).format('HH:mm')}`
      }
      return dayjs(time).format('MM-DD HH:mm')
    }
    return dayjs(time).format('MM-DD HH:mm')
  }
  if (new Date(time).getFullYear() !== new Date().getFullYear()) {
    return dayjs(time).format('YYYY-MM-DD HH:mm')
  }
}
/**
 * 具体时间
 * @param time
 */
export function formatTimeDetail(time: number) {
  return dayjs(time).format('HH:mm')
}

/**
 * 时间转换
 * @param
 */
export function formatTimeItem(time: number) {
  if (new Date(time).getFullYear() === new Date().getFullYear()) {
    if (new Date(time).getMonth() === new Date().getMonth()) {
      if (new Date(time).getDate() === new Date().getDate()) {
        return '今天'
      } else if (new Date(time).getDate() === new Date().getDate() - 1) {
        return `昨天`
      }
      return dayjs(time).format('MM-DD')
    }
    return dayjs(time).format('MM-DD')
  }
  if (new Date(time).getFullYear() !== new Date().getFullYear()) {
    return dayjs(time).format('YYYY-MM-DD')
  }
}

/**
 * 表格时间格式化
 * @param row
 * @param column
 * @param cellValue
 * @param _index
 * @returns
 */
export function formatTableTime(row: any, column: any, cellValue: number, _index: any) {
  return formatTime(cellValue)
}

/**
 * 表格 string[] 格式化
 * @param row
 * @param column
 * @param cellValue
 * @param index
 * @returns
 */
export function formatTableArrString(row: any, column: any, cellValue: string[], _index: any) {
  const res = cellValue?.join(',')
  return res || '--'
}

/**
 * 表格 string 格式化
 * @param row
 * @param column
 * @param cellValue
 * @param index
 * @returns
 */
export function formatTableShowAcross(row: any, column: any, cellValue: string, _index: any) {
  return cellValue || '--'
}
/**
 * 表单对象赋值
 * @param formState 目标对象 (将源对象中key深拷贝赋值给目标对象key)
 * @param defaultForm 源对象
 * @returns
 */
export function assignFormState(formState: any, defaultForm: any) {
  for (const key in formState) {
    if (typeof defaultForm[key] === 'object') {
      assignFormState(defaultForm[key], defaultForm[key])
    }
    if (defaultForm[key] !== undefined || defaultForm[key] !== null) {
      formState[key] = defaultForm[key]
    }
  }
  return formState
}

/**
 * 判断数据类型是否为对象
 * @param target
 * @returns
 */
export const isObject = (target: unknown) =>
  (typeof target === 'object' || typeof target === 'function') && target !== null

/**
 * 深拷贝
 * @param target
 * @param map
 * @returns
 */
export function deepClone(target: object, map = new WeakMap()) {
  if (map.get(target)) {
    return target
  }
  // 为undefined或null, 原样返回
  if (target === null || typeof target === 'undefined') {
    return target
  }

  // 获取当前值的构造函数：获取它的类型
  const constructor = target.constructor as any
  // 检测当前对象target是否与正则、日期格式对象匹配
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    // 创建一个新的特殊对象(正则类/日期类)的实例
    return new constructor(target)
  }
  if (isObject(target)) {
    map.set(target, true) // 为循环引用的对象做标记
    const cloneTarget: any = Array.isArray(target) ? [] : {}
    for (const prop in target) {
      if (Object.prototype.hasOwnProperty.call(target, prop)) {
        cloneTarget[prop] = deepClone((target as any)[prop], map)
      }
    }
    return cloneTarget
  }
  return target
}

/**
 * ['2021','1','1','0','0','0'] =>>>> 时间戳
 * @param array
 * @returns
 */
export const dayArrayToTime = (array: any) => {
  const arr = array.map((element: string | number, index: number) => {
    if (index === 1) {
      return parseInt(element as string) - 1
    }
    return parseInt(element as string)
  })
  dayjs.extend(arraySupport)
  return dayjs(arr).valueOf()
}

/**
 *时间戳 =>>>>  ['2021','01','01','00','00','00']
 * @param t
 */

export const timeToArray = (t?: number) => {
  dayjs.extend(toArray)
  return dayjs(t)
    .toArray()
    .slice(0, -1)
    .map((item, index) => {
      let value
      if (index === 1) {
        value = (item + 1).toString()
      } else {
        value = item.toString()
      }
      if (value.length === 1) {
        value = '0' + value
      }
      return value
    })
}

/**
 * 格式化时长
 * @param time 毫秒数
 * @param patter 格式  默认:x时x分x秒 参数为:=> 则为xx:xx:xx
 * @returns
 */
export const formatDuration = (time: number, patter?: string) => {
  let h = '00'
  let m = '00'
  let s = '00'
  // if (time % (60 * 60 * 1000) >= 0) {
  //   h = Math.floor(time / (60 * 60 * 1000)) + ''
  //   time = time % (60 * 60 * 1000)
  //   if (time % (60 * 1000) >= 0) {
  //     m = Math.floor(time / (60 * 1000)) + ''
  //     time = time % (60 * 1000)
  //   }
  // } else {
  //   time = time % (60 * 60 * 1000)
  //   if (time % (60 * 1000) >= 0) {
  //     m = Math.floor(time / (60 * 1000)) + ''
  //     time = time % (60 * 1000)
  //   }
  // }
  // s = Math.floor(time / 1000) + ''
  // console.log(88, time % (1000 * 60 * 60))
  // return `${h}时${m}分${s}秒`

  if (time > 0) {
    s = timeToTwo(Math.floor((time / 1000) % 60)) // 秒
    m = timeToTwo(Math.floor((time / 1000 / 60) % 60)) // 分
    h = timeToTwo(Math.floor((time / 1000 / 60 / 60) % 24)) // 余下多少时（0-23）
  }

  if (patter) {
    return `${h}${patter}${m}${patter}${s}`
  }

  return `${h}时${m}分${s}秒`
}

/**
 * 表格时长格式化
 * @param row
 * @param column
 * @param cellValue
 * @param _index
 * @returns
 */
export function formatTableDuration(row: any, column: any, cellValue: number, _index: any) {
  return formatDuration(cellValue)
}

/**
 *时间转为2为 =>>>> 1 => '01'
 * @param t
 */
export const timeToTwo = (t: number) => {
  return (t >= 10 ? '' : '0') + t
}

/**
 * 字符串首字母大写
 * @param str 字符串
 */
export const capitalize = (str: string) => {
  if (typeof str === 'string') {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return str
}

/**
 * 定时器
 * @returns
 */
export const useInterval = () => {
  let timer: NodeJS.Timeout | null = null

  const initInterval = (func: Function, wait = 1000 * 30) => {
    const interv = function () {
      func.call(null)
      timer = setTimeout(interv, wait)
    }
    timer = setTimeout(interv, wait)
  }

  const clearInterval = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { initInterval, clearInterval }
}

/**
 * 快捷时间
 * @returns
 */
export const shortcutsTime = (() => {
  const timeRang = [2, 4, 12, 24, 48, 72]
  return timeRang.map(item => ({
    text: item + '小时',
    value: () => dayjs().add(item, 'hour').valueOf()
  }))
})()

/**
 * 根据身份证 获取 出生日期
 * @returns
 */
export const getBirthByIdCard = (identity: string) => {
  return `${identity.slice(6, 10)}-${identity.slice(10, 12)}-${identity.slice(12, 14)}`
}

/**
 * 根据身份证 获取 性别
 * @returns
 */
export const getSexByIdCard = (identity: string) => {
  return Number(identity.charAt(16)) % 2 === 0 ? '女' : '男'
}

/**
 * 提取纯文本
 * @param content
 * @returns
 */
export const getPureText = (content: string) => {
  return content.replace(/<[^>]+>/g, '')
}

/**
 * 表格 提取纯文本
 * @param row
 * @param column
 * @param cellValue
 * @param _index
 * @returns
 */
export function formatTablePureText(row: any, column: any, cellValue: any, _index: any) {
  return getPureText(cellValue)
}

/**
 * 判断终端
 * @returns string pc or h5
 */
export function judgeTerminal() {
  return navigator.platform.indexOf('Win') === 0 || navigator.platform.indexOf('Mac') === 0 ? 'pc' : 'h5'
}

// 生成随机数字id
/**
 * @ifConnect 是否连字符
 */
export function genId(ifConnect = true) {
  const str = ifConnect ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  return str
    .replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .toUpperCase()
}

// 关浏览器
export const closeWindow = () => {
  if (navigator.userAgent.indexOf('MSIE') > 0) {
    if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
      window.opener = null
      window.close()
    } else {
      window.open('', '_top')
      window.top?.close()
    }
  } else if (navigator.userAgent.indexOf('Firefox') > 0) {
    window.location.href = 'about:blank ' //火狐默认状态非window.open的页面window.close是无效的
  } else {
    window.opener = null
    window.open('', '_self', '')
    window.close()
  }
}

// 名字打码 张三 => 张*
export const nameHide = (text?: string) => {
  if (!text || text.length <= 1) {
    return text
  }
  if (text.length === 2) {
    return text[0] + '*'
  }
  if (text.length > 2) {
    return text[0] + new Array(text.length - 1).join('*') + text[text.length - 1]
  }
}

// 电话打码
export const telHide = (text: string) => {
  if (text) {
    return text.slice(0, 3) + '****' + text.slice(7)
  }
  return text
}

/**
 * 比较对象是否相等
 * @param a
 * @param b
 * @returns
 */
export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) {
    //如果是绝对相等就直接返回true
    return true
  }
  //如果不是绝对相等就哦按的他们是否有相同的形状
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    //两个均是对象
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        //如果都是数组
        if (a.length === b.length) {
          //如果长度相等
          return a.every(function (e, i) {
            //用every和递归来比对a数组和b数组的每个元素，并返回
            return deepEqual(e, b[i])
          })
        }
        //长度都不等直接返回false
        return false
      } else if (a instanceof Date && b instanceof Date) {
        //如果是Date 则直接getTime 比较
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        //对象的比较
        //拿到两个对象的key
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        if (keysA.length === keysB.length) {
          //如果keys相等
          return keysA.every(function (key) {
            //用every和递归来比对a对象和b对象的每个元素值，并返回
            return deepEqual((a as any)[key], (b as any)[key])
          })
        }
        //长度都不等直接返回false
        return false
      }
    } catch (e) {
      console.error('deepEqual', e)
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    //如果都不是对象则按String来处理
    return String(a) === String(b)
  }
  return false
}

/**
 * 格式化身份证号  转 *
 * @param v
 */
export const formatIdCard = (v?: string) => {
  if (v) {
    const str = v.substring(6, 14)
    return v.replace(str, '********')
  }
  return ''
}

/**
 * 身份证号获取周岁
 * @param v
 */
export const getAgeFormCard = (v: string) => {
  const nowC = dayjs()
  const nowYear = nowC.year()
  const nowMonth = nowC.month() + 1
  const nowDay = nowC.date()
  const birthdayYear = Number(v.substring(6, 10))
  const birthdayMonth = Number(v.substring(10, 12))
  const birthdayDay = Number(v.substring(12, 14))
  const monthLtFlag = nowMonth < birthdayMonth
  const monthDayFlag = nowMonth === birthdayMonth && nowDay < birthdayDay
  let age = nowYear - birthdayYear
  if (monthLtFlag || monthDayFlag) {
    age--
  }
  return age
}
/**
 * 阿拉伯数字转中文
 * @param num 阿拉伯整数
 * @returns
 */
export const convertToChinaNum = (num: number) => {
  const arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const arr2 = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'] //可继续追加更高位转换值
  if (!num || isNaN(num)) {
    return '零'
  }
  const english = num.toString().split('')
  let result = ''
  for (let i = 0; i < english.length; i++) {
    const desI = english.length - 1 - i //倒序排列设值
    result = arr2[i] + result
    const arrOneIndex = english[desI]
    result = arr1[Number(arrOneIndex)] + result
  }
  //将【零千、零百】换成【零】 【十零】换成【十】
  result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十')
  //合并中间多个零为一个零
  result = result.replace(/零+/g, '零')
  //将【零亿】换成【亿】【零万】换成【万】
  result = result.replace(/零亿/g, '亿').replace(/零万/g, '万')
  //将【亿万】换成【亿】
  result = result.replace(/亿万/g, '亿')
  //移除末尾的零
  result = result.replace(/零+$/, '')
  //将【零一十】换成【零十】
  //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
  //将【一十】换成【十】
  result = result.replace(/^一十/g, '十')
  return result
}

/**
 * 数字格式化  保留几位有效小数
 * @param number
 * @param digit
 */
export function formatDecimal(number?: number, digit = 1) {
  return number ? number.toFixed(digit) : '0'
}

/**
 * 数字格式化 表格
 * @param row
 * @param column
 * @param cellValue
 * @param _index
 * @returns
 */
export function formatTableDecimal(row: any, column: any, cellValue: number, _index: any) {
  return formatDecimal(cellValue)
}

/**
 * Base64编码
 * @param str
 * @returns
 */
export function base64Encode(str: string) {
  const encodedString = btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16))
    })
  )
  return encodedString
}

/**
 * Base64解码
 * @param str
 * @returns
 */
export function base64Decode(str: string) {
  const decodedString = decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return decodedString
}

/**
 * 十六进制转rgb
 * @param hex
 * @returns
 */
export function hexToRgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  return { r, g, b }
}

/**
 * 计算圆线的坐标点
 * // 使用示例
    const latitude = 40.7128; // 纬度
    const longitude = -74.0060; // 经度
    const radius = 5; // 单位为公里
    const resolution = 30;
 */
export function calculateCircleCoordinates(latitude: number, longitude: number, radius: number, resolution: number) {
  const coordinates = []
  const angleStep = (2 * Math.PI) / resolution

  for (let i = 0; i < resolution; i++) {
    const angle = i * angleStep

    const x = radius * Math.cos(angle) // x 坐标是相对于经度的偏移量
    const y = radius * Math.sin(angle) // y 坐标是相对于纬度的偏移量

    const newY = latitude + y / 111.32 // 纬度的 1° 约等于 111.32 公里
    const newX = longitude + x / (111.32 * Math.cos((latitude * Math.PI) / 180)) // 经度的 1° 约等于 111.32 公里乘以纬度的余弦值

    coordinates.push(newX + ',' + newY)
  }

  return coordinates
}

/**
 * 判断两个数组是否有相同的数据
 * @param arr1
 * @param arr2
 * @returns
 */
export function haveSameData(arr1: any[], arr2: any[]) {
  const len = arr1.length + arr2.length
  const newlen = new Set([...arr1, ...arr2]).size
  return len > newlen
}
