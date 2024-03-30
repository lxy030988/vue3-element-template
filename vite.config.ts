import path from 'path'
import { loadEnv, defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { createRollupPlugin } from './build/plugin'
import { wrapperEnv } from './build/utils'

const CWD: string = process.cwd()
import pkg from './package.json'

// import vm from './plugins/test-vite-plugin'
// import i18n from './plugins/vite-plugin-i18n'

const alias: Record<string, string> = {
  '@': path.resolve(__dirname, 'src')
  // img: path.resolve(__dirname, 'src/assets')
}

export default defineConfig(({ mode }: any) => {
  // console.log('mode', mode)
  const env = loadEnv(mode, CWD)
  const viteEnv = wrapperEnv(env)
  console.log('viteEnv=>', viteEnv)
  const { VITE_DROP_CONSOLE, VITE_THEME } = viteEnv

  return {
    root: path.resolve(__dirname),
    base: '/', //生产过程中的基本公共路径 默认 '/'
    resolve: {
      alias
    },
    server: {
      host: '0.0.0.0',
      port: 3030,
      proxy: {
        '/api/': {
          target: 'http://192.168.0.58:8001/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\//, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/styles/theme/${VITE_THEME}.scss" as *;
            @use "@/styles/var/index.scss" as *;
          `
        }
      }
    },
    optimizeDeps: {
      include: ['element-plus/es/locale/lang/zh-cn'],
      exclude: []
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version)
    },
    plugins: [
      vue(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(CWD, 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      })
    ], //, vm(), i18n
    build: {
      target: 'es2015',
      // polyfillDynamicImport: true,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_debugger: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },

      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        plugins: createRollupPlugin()
      }
    }
  }
})
