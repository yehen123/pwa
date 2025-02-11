const path = require('path')
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

const sw = process.env.SW === 'true'

// import requireTransform from 'vite-plugin-require-transform'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
  ],

  pwa: {
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      name: 'nuxt3-pwa',
      short_name: 'nuxt3-pwa',
      description: 'nuxt3-pwa',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'fullscreen',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,less,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/swjxb\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
          },
        },
      ],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,less,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 3600,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^.*$/],
      type: 'module',
    },
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui,viewport-fit=cover',
        },
      ],
    },
  },

  postcss: {
    // 添加插件名称作为键，参数作为值
    // 使用npm或yarn安装它们
    plugins: {
      'postcss-pxtorem': {
        rootValue(p: any) {
          const { file } = p
          const designWidth = 750
          // vant 视为 375px基准
          const libDesignWidth = 375
          // 处理windows/linux平台兼容
          const isVantLib = path.normalize(file).replace(/\\/g, '/').includes('/vant/')
          const ratio = 100
          const libBase = libDesignWidth / designWidth
          return (isVantLib ? libBase : 1) * ratio
        },
        exclude(file: string) {
          let res = false
          if (file.indexOf('hqchart') >= 0) {
            res = true
          }
          if (file.indexOf('error.vue') >= 0) {
            res = true
          }
          return res
        },
        propList: ['*'],
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve('assets/css/vars.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
    plugins: [
      // requireTransform({
      //   fileRegex: /.js$|.vue$/,
      // }),
      Components({
        resolvers: [
          VantResolver({
            // 需要额外处理showToast等方法，且这部分css载入顺序不可控，造成样式异常，所以改为全量加载css。
            importStyle: false,
          }),
        ],
      }),
    ],
  },
  nitro: {
    compressPublicAssets: true, // 启动压缩
  },
  build: {
    transpile: [/echarts/, 'resize-detector', 'lodash-es'],
  },
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      // 通过envFile写入的
      apiUrl: 'https://swjxb.com:8989',
      // apiUrl: 'http://8.210.39.65:888/',
      // apiUrl: 'http://47.243.198.66:888',
      // apiUrl: 'https://127.0.0.1',
      theme: 'light',
      // 其他的
      authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
    },
  },

  compatibilityDate: '2024-07-15',
})
