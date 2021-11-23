export interface TPageItem {
  path: string
  name: string
  title: string
}

export const defaultPageConfig: Record<string, TPageItem[]> = {
  dev: []
}

export const fullPageConfig: Record<string, TPageItem[]> = {
  dev: [
    {
      path: 'dev/1',
      name: 'dev1',
      title: '测试1'
    },
    {
      path: 'dev/2',
      name: 'dev2',
      title: '测试2'
    }
  ]
}
