import type { RouteLocationNormalized } from '#vue-router'
let prevPosition = -1
let currentPosition = 0

export const initRouterBack = () => {
  if (import.meta.client) {
    const router = useRouter()
    router.afterEach(() => {
      if (currentPosition > 0) {
        prevPosition = currentPosition
      }
      currentPosition = history.state.position
    })
  }
}
// 在beforeEach中使用必须借助from判断
export const getIsRouterBack = (from?: RouteLocationNormalized) => {
  if (!import.meta.client) {
    return false
  }
  if (from) {
    return from.fullPath === history.state.forward
  }
  return !!(
    history.state &&
    history.state.forward &&
    $utils.is.isNumber(history.state.position) &&
    history.state.position < prevPosition
  )
}
