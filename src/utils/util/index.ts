/**
 * 随机数 - 字母+数字
 * @param num 随机数长度
 * @returns
 */
export function createNonceStr(num: number) {
  const chars = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  const len = chars.length
  let str = ''
  for (let i = 0; i < num; i++) {
    const id = Math.floor(Math.random() * len)
    str += chars[id]
  }
  return str
}
