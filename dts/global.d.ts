interface ResponseScheme<T> {
  code: string
  msg: string
  data: T
}
interface PageScheme<T> {
  pageNo: number
  pageSize: number
  rows: T[]
  totalCount: number
  totalPage: number
}
type OptionItem<T = any> = {
  value: string | number
  label: string
  disabled?: boolean
  origin?: T
}
type OptionList<T = any> = Array<OptionItem<T>>
declare global {}
declare module 'nprogress'
