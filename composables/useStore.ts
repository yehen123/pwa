import type { RouteLocationNormalized } from '#vue-router'
import { defineStore } from 'pinia'
import { getInfo } from '@/service/login'
import { throttle } from 'lodash-es'
// import { refreshToken as refreshTokenApi } from '@/service/login'
// import { parseJwt } from '@/utils/utils/jwt'
export const useAppStore = defineStore('app', {
  state: () => {
    return {
      show: true,
    }
  },
  actions: {
    reload() {
      this.show = false
      nextTick(() => {
        this.show = true
      })
    },
  },
})
export const useUserStore = defineStore('user', {
  state: (): User.UserStore => {
    return {
      auth: {
        accessToken: '',
        refreshToken: '',
      },
      userInfo: {},
    }
  },
  actions: {
    login(loginData: any) {
      const data = loginData
      this.auth.accessToken = data.access_token
      this.auth.refreshToken = data.refresh_token
      this.updateUserInfo()
    },
    updateUserInfo: throttle(
      async function (this: User.UserStore) {
        // this.userInfo = parseJwt(this.auth.accessToken)
        const uInfo = await getInfo()
        this.userInfo = uInfo
      },
      200,
      {
        trailing: false,
      }
    ),
    logout() {
      this.$reset()
    },
    async doRefreshToken() {
      // const res = await refreshTokenApi(this.auth.refreshToken)
      // await this.login(res)
    },
  },
  persist: {
    // storage: persistedState.sessionStorage,
    paths: ['auth'],
  },
})
export const usePermissionStore = defineStore('permission', {
  state: (): { menus: string[]; buttons: string[]; loaded: boolean } => {
    return {
      menus: [],
      buttons: [],
      loaded: false,
    }
  },
  actions: {
    async initPermission() {
      this.menus = ['/']
      this.buttons = ['INDEX:TEST']
      this.loaded = true
    },
    hasPagePermission(to: RouteLocationNormalized) {
      if (to.path === '/testNoPermission') {
        return false
      }
      return true
    },
    hasButtonPermission() {
      return true
    },
  },
})
