export const localData = {
  setData(key: string, value: string) {
    window.localStorage.setItem(key, value)
  },
  getData(key: string) {
    return window.localStorage.getItem(key)
  },
  removeData(key: string) {
    window.localStorage.removeItem(key)
  },
  clearAllData() {
    window.localStorage.clear()
  }
}

export const storageSet = (key: string, info: string | object | null) => {
  if (info) {
    if (typeof info === 'string') {
      localData.setData(key, info)
    } else {
      localData.setData(key, JSON.stringify(info))
    }
  } else {
    localData.removeData(key)
  }
}

export const storageGet = <T = any>(key: string) => {
  const data = localData.getData(key)

  if (data) {
    return JSON.parse(data) as T
  }
  return null
}
