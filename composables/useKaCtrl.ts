const include = ref<Array<string>>([])
let longKeep: Array<string> = []
let tempKeep: Array<string> = []

export const useKaCtrl = () => {
  const currentInstance = getCurrentInstance()
  const getName = () => {
    return currentInstance?.type.name || currentInstance?.type.__name
  }
  const tempKeepFn = (pageComponentName?: string) => {
    const name = pageComponentName || getName()
    if (name) {
      if (!longKeep.includes(name) && !tempKeep.includes(name)) {
        tempKeep.push(name)
      }
    }
    include.value = [...longKeep, ...tempKeep]
  }
  const keepFn = (pageComponentName?: string) => {
    const name = pageComponentName || getName()
    if (name) {
      if (!longKeep.includes(name)) {
        longKeep.push(name)
        tempKeep = tempKeep.filter((cName) => cName !== name)
      }
    }
    include.value = [...longKeep, ...tempKeep]
  }

  const releaseTemp = (pageComponentName?: string): void => {
    const name = pageComponentName || getName()
    if (name) {
      tempKeep = tempKeep.filter((cName) => cName !== name)
    }
    include.value = [...longKeep, ...tempKeep]
  }
  const releaseLong = (pageComponentName?: string): void => {
    const name = pageComponentName || getName()
    if (name) {
      longKeep = longKeep.filter((cName) => cName !== name)
    }
    include.value = [...longKeep, ...tempKeep]
  }
  // 在组件激活时，如果当前组件是临时存储的需要从tempKeep中移除
  const release = (pageComponentName?: string): void => {
    releaseTemp(pageComponentName)
    releaseLong(pageComponentName)
  }

  onActivated(() => {
    releaseTemp()
  })

  return {
    tempKeep: tempKeepFn,
    keep: keepFn,
    release,
    include,
  }
}
