import path from 'path'
import { loadEnv, defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { wrapperEnv } from './build/utils'
import readIconFile from './plugins/vite-plugin-icon'
import compression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const CWD: string = process.cwd()

const alias: Record<string, string> = {
  '@': path.resolve(__dirname, 'src')
}

export default defineConfig(({ mode }: any) => {
  // console.log('mode', mode)
  const env = loadEnv(mode, CWD)
  const viteEnv = wrapperEnv(env)
  console.log('viteEnv=>', viteEnv)
  const { VITE_THEME } = viteEnv

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
        '/imp-gwy-api/': {
          target: 'http://192.168.4.151:10000/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/imp-gwy-api\//, '')
        },
        '/w-gwy-api': {
          target: 'ws://192.168.4.151:10089',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/ws-gwy-api/, '')
        }
      }
    },
    preview: {
      port: 4030
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
      include: [],
      exclude: []
    },
    define: {
      // __VERSION__: JSON.stringify(pkg.version)
    },
    plugins: [
      vue(),
      vueJsx(),
      Components({
        globs: ['src/components/*/index.vue'],
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(CWD, 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      visualizer(),
      readIconFile(),
      compression()
    ],
    esbuild: {
      // drop: ['console', 'debugger']
      pure: ['console.log']
    },
    build: {
      target: 'es2015',
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_debugger: VITE_DROP_CONSOLE,
      //     // drop_console: VITE_DROP_CONSOLE
      //     pure_funcs: ['console.log']
      //   }
      // },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'vuex'],
            'element-plus': ['element-plus'],
            echarts: ['echarts', 'echarts-gl', 'echarts-wordcloud']
          }
        }
      }
    }
  }
})
