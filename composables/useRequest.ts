import nprogress from 'nprogress'

import type { UseFetchOptions } from '#app'
import type { FetchContext, FetchResponse } from 'ofetch'

import type { ActiveLoader } from 'vue-loading-overlay'
import { useLoading } from 'vue-loading-overlay'

import EventEmitter from 'events'
import { throttle } from 'lodash-es'

type FetchOptions = Parameters<typeof $fetch>[1]
interface RequestStandaloneOption {
  postDataType?: 'formData' | 'form' | 'json'
  withAuth?: boolean
  showLoading?: boolean
  showProgress?: boolean
  showError?: boolean
  // 传校验函数的值为false时，会走异常逻辑
  validResponse?: null | ((data: any) => boolean)
}
export type RequestOptions = FetchOptions & RequestStandaloneOption
type UseRequestOptions<T> = RequestOptions & UseFetchOptions<T>

const ee = new EventEmitter()

export const useRequest = <T>(url: string | (() => string), options: UseRequestOptions<T> = {}) => {
  const defaultOptions = useRequestOptions()
  const mergedOptions = Object.assign({}, defaultOptions, options)

  return useFetch(url, mergedOptions)
}

export const useRequestOptions = () => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()
  const progress = useRequestProgress()
  const loading = useRequestLoading()
  const errorMsg = useRequestErrorMsg()
  const router = useRouter()
  const logout = throttle(
    async () => {
      await userStore.logout()
      router.push('/login')
    },
    1000,
    {
      trailing: false,
    }
  )
  const setWithAuth = (headers) => {
    if (userStore.auth.accessToken) {
      headers.set('Authorization', userStore.auth.accessToken)
    }
  }
  const validResponse = (data) => {
    if ($utils.is.isObject(data)) {
      if (data.code !== 200) {
        return false
      }
    }
    return true
  }
  const getErrorMsg = (data) => {
    return data?.msg
  }
  const is401 = (data) => {
    return data?.code === 401
  }
  const defaultOptions: RequestOptions = {
    postDataType: 'json',
    showLoading: false,
    showProgress: false,
    showError: true,
    withAuth: true,
    baseURL: config.public.apiUrl,
    validResponse: validResponse,
    onRequest(context) {
      const _options = context.options as RequestOptions
      const headers = new Headers(_options.headers)

      if (_options.showProgress) {
        progress.show()
      }
      if (_options.showLoading) {
        loading.show()
      }
      if (_options.postDataType === 'formData') {
        if (_options.body && typeof _options.body === 'object' && !(_options.body instanceof FormData)) {
          const body = _options.body as Record<string, any>
          const nBody = new FormData()
          Object.keys(body).forEach((key: string) => {
            nBody.append(key, body[key])
          })
          _options.body = nBody
        }

        headers.set('Content-Type', 'multipart/form-data;charset=UTF-8')
      } else if (_options.postDataType === 'form') {
        // fetch 在contentType:x-www-form-urlencoded时，会自动序列化URLSearchParams
        if (_options.body && typeof _options.body === 'object' && !(_options.body instanceof URLSearchParams)) {
          const body = _options.body as Record<string, any>
          const nBody = new URLSearchParams(body)
          context.options.body = nBody
        }
        headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
      } else {
        headers.set('Content-Type', 'application/json;charset=UTF-8')
      }
      if (_options.withAuth) {
        setWithAuth(headers)
      }
      context.options.headers = headers
    },
    async onRequestError(context) {
      // 请求异常时，需要关闭progress 和 loading，如 请求cancel
      const _options = context.options as RequestOptions
      if (_options.showProgress) {
        progress.hide()
      }
      if (_options.showLoading) {
        loading.hide()
      }
      if (_options.showError) {
        errorMsg.show('网络异常')
      }
    },
    async onResponse(context) {
      const _options = context.options as RequestOptions
      if (_options.showProgress) {
        progress.hide()
      }
      if (_options.showLoading) {
        loading.hide()
      }

      try {
        const authCtrl = useAuthCtrl(context, (ctx) => {
          // 刷新token的接口接口404，说明refreshToken过期了
          return ctx.response?.status === 401 || is401(ctx.response?._data)
        })
        const res = await authCtrl.done()
        context.response = res
        if (
          context.response.status < 400 &&
          _options.validResponse &&
          !_options.validResponse(context.response._data)
        ) {
          throw createError({
            statusCode: 500,
            statusMessage: 'E_UNEXCEPTED_RESPONESE',
            message: getErrorMsg(context.response._data) || '数据异常',
            data: context.response._data,
          })
        }
      } catch (e: any) {
        if (e.statusMessage === 'E_NO_REFRESHTOKEN' || e.statusMessage === 'E_REFRESH_FAIL') {
          logout()
        } else {
          if (_options.showError) {
            // show Error;\
            errorMsg.show(e.message)
          }
        }
        throw e
      }
    },
    onResponseError(context) {
      const _options = context.options as RequestOptions
      const message = getErrorMsg(context.response._data) || '服务异常'
      if (_options.showError) {
        // show Error;
        errorMsg.show(message)
      }
      //
      context.error = createError({
        statusCode: 500,
        statusMessage: 'E_SERVER_ERROR',
        message: message,
        data: context.response._data,
      })
    },
  }
  return defaultOptions
}
// progress只在client时渲染
export const useRequestLoading = () => {
  const $loading = useLoading()
  let count = 0
  let loadingInstance: ActiveLoader
  return {
    show: function () {
      if (import.meta.client) {
        count++
        if (count === 1) {
          loadingInstance = $loading.show({})
        }
      }
    },
    hide: function () {
      if (import.meta.client) {
        count--
        if (count === 0) {
          loadingInstance?.hide()
        }
      }
    },
  }
}
// progress只在client时渲染
export const useRequestProgress = () => {
  const pageProgress = useLoadingIndicator()
  let count = 0
  return {
    show: function () {
      if (import.meta.client) {
        // requestProgress时，需要先隐藏pageProgress
        pageProgress.clear()
        count++
        if (count === 1) {
          nprogress.start()
        }
      }
    },
    hide: function () {
      if (import.meta.client) {
        count--
        if (count === 0) {
          nprogress.done()
        }
      }
    },
  }
}
export const useRequestErrorMsg = () => {
  return {
    show: function (message: string) {
      if (import.meta.client) {
        $message.error(message)
      }
    },
    hide: function () {},
  }
}
let refreshTokenLock = false
// 1.登出 2.刷新token（如果存在refreshToken）
export const useAuthCtrl = <T>(context: FetchContext, is401: (response: FetchContext) => boolean) => {
  return {
    done(): Promise<FetchResponse<any>> {
      return new Promise((resolve, reject) => {
        if (is401(context)) {
          const userStore = useUserStore()
          if (userStore.auth.refreshToken) {
            const resendFetch = () => {
              return resolve($fetch.raw<T, any, any>(context.request, context.options))
            }
            if (!refreshTokenLock) {
              // 一次session 内只会做一次refresh 操作
              refreshTokenLock = true
              userStore
                .doRefreshToken()
                .then(() => {
                  resendFetch()
                  // 给其他阻塞的请求发送信息，可以重发请求了
                  ee.emit('refreshToken')
                })
                .catch((e) => {
                  console.warn(`[refresh token fail] ${e.message}`)
                  reject(createError({ statusCode: 401, statusMessage: 'E_REFRESH_FAIL', message: '更新登录信息失败' }))
                })
            } else {
              // 阻塞请求，等待 refreshToken触发后重发请求
              ee.once('refreshToken', resendFetch)
            }
          } else {
            reject(createError({ statusCode: 401, statusMessage: 'E_NO_REFRESHTOKEN', message: '无法更新登录信息' }))
          }
        } else {
          resolve(context.response!)
        }
      })
    },
  }
}
