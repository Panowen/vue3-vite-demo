import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 自动导入 src/components组件
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true
    }),
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
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
