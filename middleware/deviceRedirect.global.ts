import MobileDetect from 'mobile-detect'

export default defineNuxtRouteMiddleware((to) => {
  const req = useRequestHeaders()
  if (req && req['user-agent']) {
    const md = new MobileDetect(req['user-agent'])
    const isMobile = !!md.mobile()
    // 如果是手机并且访问的是非移动端页面，进行重定向
    if (isMobile && to.path.startsWith('/site')) {
      return navigateTo('/')
    }

    // 如果是桌面设备并且访问的是移动端页面，进行重定向
    if (!isMobile && !to.path.startsWith('/site')) {
      return navigateTo('/site')
    }
  }
})
