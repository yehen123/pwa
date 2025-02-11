import { LoadingPlugin } from 'vue-loading-overlay'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.locale('zh-cn')
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.tz.setDefault('Asia/Shanghai')
  const app = nuxtApp.vueApp
  // utils里面注册到全局可以访问，但是无法通过this.xx访问
  // @ts-ignore
  // app.config.globalProperties.$request = $request
  app.use(LoadingPlugin)
  $utils.routerBack.initRouterBack()
})
