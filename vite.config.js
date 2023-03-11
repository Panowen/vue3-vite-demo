import { resolve } from 'path'
import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import pkg from './package.json'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
const { ALIOSS, URL } = require('./config/index.js')
console.log(URL)
/** 路径查找 */
const pathResolve = (dir) => {
  return resolve(__dirname, '.', dir)
}
const { name, version } = pkg
const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_PUBLIC_PATH,
    root: process.cwd(),
    plugins: [
      vue(),
      vueJsx(),
      // 自动导入以下包的方法
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'pinia/dist/pinia': ['storeToRefs']
          }
        ],
        //配置后会自动扫描目录下的文件
        dirs: ['src/hooks/**', 'src/utils/**', 'src/store/**', 'src/api/**']
      })
    ],
    resolve: {
      alias: {
        '@': pathResolve('src')
      }
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: env.VITE_PORT,
      host: '0.0.0.0',
      proxy: {}
    },
    optimizeDeps: {
      include: ['dayjs', 'pinia', 'vue-clipboard3', 'nprogress', 'lodash-es']
    },
    build: {
      // 启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('index.html')
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    define: {
      ALI_OSS: JSON.stringify(ALIOSS[env.VITE_ENV]),
      BASEURL: JSON.stringify(URL[env.VITE_ENV]),
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  }
})
