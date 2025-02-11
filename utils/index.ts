import { showToast, showSuccessToast, showDialog } from 'vant'
import dayjs from 'dayjs'
import * as common from './utils/common'
import * as is from './utils/is'
import * as routerBack from './utils/routerBack'
import * as stock from './utils/stock'
import * as format from './utils/format'
import reg from './utils/reg'

export const $message = {
  error(msg: string) {
    showToast(msg)
  },
  success(msg: string) {
    showSuccessToast(msg)
  },
}
export const $alert = (content, title = '提示') => {
  return showDialog({
    title,
    message: content,
    showCancelButton: false,
  })
}
export const $confirm = (content, title = '提示', options: any = {}) => {
  return showDialog({
    title,
    message: content,
    showCancelButton: true,
    ...options,
  })
}
export const $dayjs = dayjs
// 分模块的使用$utils暴漏
export const $utils = {
  is,
  routerBack,
  stock,
  reg,
  common,
  format,
}
