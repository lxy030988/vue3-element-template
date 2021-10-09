interface Item {
  key: string
  value: string | number
  label: string
}

interface IJcEnum {
  readonly container: Map<PropertyKey, string>
  VALUES: Item[]
  toString(keys: any): string
  [key: string]: any
}

class JcEnum implements IJcEnum {
  public readonly container: Map<PropertyKey, string>
  public VALUES: Item[];
  [key: string]: any

  constructor(values: Item[]) {
    this.VALUES = values

    this.container = new Map()

    values.forEach(item => {
      this[item.key] = item.value
      this.container.set(item.value, item.label)
    })
  }

  toString(keys: any) {
    if (arguments.length > 0) {
      if (keys instanceof Array) {
        const result: any = []

        keys.forEach(key => {
          const label = this.container.get(key)

          if (label) {
            result.push(label)
          }
        })
        return result.join(',')
      } else {
        return this.container.get(keys) || ''
      }
    }
    const result = []

    for (const [value, label] of this.container) {
      result.push(label)
    }
    return result.join('，')
  }

  get [Symbol.toStringTag]() {
    return 'JcEnum'
  }
}

export { JcEnum }
export default JcEnum
