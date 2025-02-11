import BasePop from '@/components/BasePop.vue'
import ErrorPage from '@/error.vue'
import { h, render } from 'vue'
const isSingleton = true

const getMountNode = (function () {
  const singletonMountNode = import.meta.client ? document.createElement('div') : null
  return function () {
    return isSingleton ? singletonMountNode : document.createElement('div')
  }
})()
function showPop(content: any) {
  if (import.meta.client) {
    const app = useNuxtApp().vueApp
    const mountNode = getMountNode()
    const vnode = h(BasePop, { content: content, destroyOnRouteChange: true })
    vnode.appContext = app._context as any
    render(null, mountNode!)
    render(vnode, mountNode!)
  }
}
export const showErrorPop = (error: Error) => {
  showPop(h(ErrorPage, { error }))
}
