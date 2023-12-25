declare module '*.vue' {
  import type { DefineComponent, FunctionalComponent } from 'vue'
  const component: DefineComponent | FunctionalComponent
  // const component: DefineComponent<{}, {}, any> | FunctionalComponent
  export default component
}

declare module '*.md' {
  import type { DefineComponent, FunctionalComponent } from 'vue'
  const component: DefineComponent | FunctionalComponent
  // const component: DefineComponent<{}, {}, any> | FunctionalComponent
  export default component
}

declare type Nullable<T> = T | null
declare module 'leaflet'
declare module 'mars2d'
declare module 'mars3d'
declare module 'virtual:*'

// declare module '*.png'
// declare module 'mars2d/dist/mars2d.js'

// declare module '*.scss' {
//   const classes: {
//     [key: string]: string
//   }
//   export default classes
// }

type RequestIdleCallbackHandle = any
type RequestIdleCallbackOptions = {
  timeout: number
}
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean
  timeRemaining: () => number
}

declare interface Window {
  requestIdleCallback: (
    callback: (deadline: RequestIdleCallbackDeadline) => void,
    opts?: RequestIdleCallbackOptions
  ) => RequestIdleCallbackHandle
  cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void
  [key: string]: any
}

declare interface ImportMeta {
  [key: string]: any
}
