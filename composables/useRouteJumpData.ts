let init = false
let data: any = null
let clearFlag = false
export const useRouteJumpData = () => {
  if (!init) {
    const router = useRouter()
    router.afterEach(() => {
      if (clearFlag) {
        data = null
        clearFlag = false
      } else {
        clearFlag = true
      }
    })
    init = true
  }
  return {
    get() {
      return data
    },
    set(v: any) {
      clearFlag = false
      data = v
    },
  }
}
