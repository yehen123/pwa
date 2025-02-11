export default defineNuxtRouteMiddleware(async (to, from) => {
  // 需要都保留 pageTransition ,否则会影响 keepalive 效果
  const pageTransitionDirection = 'BOTH' as 'BOTH' | 'DEFAULT'
  // tabbar 切换时，不显示动画
  if (import.meta.client) {
    if (
      ['/', '/market', '/trade', '/financing', '/mine'].includes(to.path) &&
      ['/', '/market', '/trade', '/financing', '/mine'].includes(from.path)
    ) {
      to.meta.pageTransition = {
        name: 'none',
      }
      from.meta.pageTransition = {
        name: 'none',
      }
      return
    }
    if (to.fullPath === from.fullPath) {
      to.meta.pageTransition = {
        name: 'none',
      }
    } else {
      if (!to.meta.pageTransition) {
        if (pageTransitionDirection === 'DEFAULT') {
          to.meta.pageTransition = {
            name: 'default',
            mode: 'out-in',
          }
        } else if (pageTransitionDirection === 'BOTH') {
          to.meta.pageTransition = $utils.routerBack.getIsRouterBack(from)
            ? {
                name: 'back',
                mode: 'out-in',
              }
            : {
                name: 'forward',
                mode: 'out-in',
              }
        } else {
          to.meta.pageTransition = {
            name: 'none',
          }
        }
      }
    }
  }
})
