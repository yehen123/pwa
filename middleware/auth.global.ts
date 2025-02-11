export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/401' || to.path === '/404' || to.path === '/500' || to.path === '/login' || to.path === '/sso') {
    return
  }
  if (to.path === '/') {
    return
  }
  if (to.path.startsWith('/site')) {
    return
  }
  const userStore = useUserStore()
  if (!userStore.auth.accessToken) {
    // 看需求需要重新登陆时显示login
    return navigateTo({
      path: '/login',
      query: {
        redirectUrl: encodeURIComponent(to.fullPath),
      },
    })
    // 直接结束无后续显示401
    // return navigateTo('/401')
  }
  // 已报错的情况下不再进行任何请求
  const hasError = useNuxtApp().payload.error

  if (!hasError) {
    const permissionStore = usePermissionStore()
    if (JSON.stringify(userStore.userInfo) === '{}') {
      // 错误
      await userStore.updateUserInfo()
    }
    if (!permissionStore.loaded) {
      await permissionStore.initPermission()
    }
    const permission = permissionStore.hasPagePermission(to)
    if (!permission) {
      return navigateTo('/403')
    }
  }
})
