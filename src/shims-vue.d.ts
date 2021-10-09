declare module '*.vue' {
  import type { DefineComponent, FunctionalComponent } from 'vue'
  const component: DefineComponent | FunctionalComponent
  // const component: DefineComponent<{}, {}, any> | FunctionalComponent
  export default component
}

declare type Nullable<T> = T | null

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
