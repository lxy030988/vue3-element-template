import path from 'path'
import fs from 'fs'
export interface ViteEnv {
  VITE_BASE_URL: string
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_GZIP: boolean
  VITE_THEME: string
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: any): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName
    ret[envName] = realName
    process.env[envName] = realName
  }
  return ret
}

export function isBuildGzip(): boolean {
  return process.env.VITE_BUILD_GZIP === 'true'
}

export function isReportMode(): boolean {
  return process.env.REPORT === 'true'
}

export function isSiteMode(): boolean {
  return process.env.SITE === 'true'
}

export function isProdFn(mode: 'development' | 'production'): boolean {
  return mode === 'production'
}

export const isFunction = (arg: unknown): arg is (...args: any[]) => any => typeof arg === 'function'

export function readAllFile(root: string, reg: RegExp) {
  let resultArr: string[] = []
  try {
    if (fs.existsSync(root)) {
      const stat = fs.lstatSync(root)
      if (stat.isDirectory()) {
        // dir
        const files = fs.readdirSync(root)
        files.forEach(function (file) {
          const t = readAllFile(root + '/' + file, reg)
          resultArr = resultArr.concat(t)
        })
      } else if (reg !== undefined) {
        if (isFunction(reg.test) && reg.test(root)) {
          resultArr.push(root)
        }
      } else {
        resultArr.push(root)
      }
    }
  } catch (error) {
    console.error('readAllFile', error)
  }

  return resultArr
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getCwdPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir)
}
