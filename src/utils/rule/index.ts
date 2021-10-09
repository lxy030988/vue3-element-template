export const NOT_NULL = [{ required: true, message: '输入不能为空' }]

export const SELECT_NOT_NULL = [{ required: true, message: '选择不能为空' }]

export function getStringRule(max = 20, min = 1) {
  if (min > 0) {
    return [...NOT_NULL, { min, max, message: `长度区间应该为 ${min}个字符到${max}个字符` }]
  }
  return [{ max, message: `长度不超过${max}个字符` }]
}

export function getIntegerRule(max?: number, min?: number) {
  const extraRules: any[] = []

  if (max) {
    extraRules.push({ max, message: `整数不大于${max}` })
  }
  if (min) {
    extraRules.push({ min, message: `整数不小于${min}` })
  }

  return [{ required: true, type: 'integer', message: '请输入整数' }, ...extraRules]
}
