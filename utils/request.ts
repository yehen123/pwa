import type { RequestOptions } from '#imports'

const $request = async <T = ResponseScheme<any>>(url: string, options?: RequestOptions): Promise<T> => {
  const defaultOptions = useRequestOptions()
  const mergedOptions = Object.assign({}, defaultOptions, options)

  return $fetch(url, mergedOptions)
}

// 为 $request 函数添加 POST 方法
$request.post = async <T = ResponseScheme<any>>(
  url: string,
  data?: RequestInit['body'] | Record<string, any>,
  options?: RequestOptions
) => {
  return $request<T>(url, {
    ...options,
    method: 'POST',
    body: data || options?.body,
  })
}

// 为 $request 函数添加 GET 方法
$request.get = async <T = ResponseScheme<any>>(url: string, options?: RequestOptions) => {
  return $request<T>(url, {
    method: 'GET',
    ...options,
  })
}

export { $request }
