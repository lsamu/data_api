import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from "vite-plugin-compression";

let configParam = process.env.npm_lifecycle_event as any;

let buildLib = {};

if (configParam.includes("build:sass")) {
  // let configParamArr = configParam.split(":");
  buildLib = {
    outDir: "../../sass_admin/www-admin-vue3/public/static/magic/"
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"]
    }),
    viteCompression({
      // 开启gzip模式
      verbose: true,
      disable: false,
      threshold: 10240 * 50,
      deleteOriginFile: false, // 压缩后是否删除源文件
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  build: {
    emptyOutDir: true,
    ...buildLib,
    minify: "terser",
    // 不生成source map文件，默认false
    sourcemap: false,
    // chunk大小警告限制，默认500kbs
    chunkSizeWarningLimit: 1500,
    // 是否禁用css拆分(默认true)，设置false时所有CSS将被提取到一个CSS文件中
    cssCodeSplit: true,
    // 简要配置
    terserOptions: {
      compress: {
        // 移除console
        drop_console: true,
        // 移除debugger
        drop_debugger: true,
      },
      // 保留类名
      keep_classnames: true,
      format: {
        // 移除所有的注释
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vue": ["vue", "vuex","vue-router"],
          "element-plus": ["element-plus"],
          "lodash": ["lodash"],
          "monaco-editor": ["monaco-editor"],
          "pinia":["pinia","pinia-plugin-persistedstate"],
          "vue-use":["@vueuse/core","@vueuse/components"],
          "splitpanes":["splitpanes"],
          "axios":["axios"],
          "vue-sfc":["vue3-sfc-loader"],
        }
      }
    }
    // rollupOptions:{
    //   external: ["element-plus", "echart"],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //       vue: "Vue",
    //     }
    //   }
    // }
  },
  server: {
    port: 8081,
    // proxy: {
    //   '/dev-api': {
    //     target: 'http://localhost:2001',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => {
    //       return path.replace("/dev-api", "");
    //     }
    //   },
    // }
  }
})
