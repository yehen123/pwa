export const getImportantNews = async () => {
  try {
    const res = await $request('/prod-api/home/zixun/info/')
    return res.data.list
  } catch (e) {
    return []
  }
}
export const getFlashNews = async () => {
  try {
    const res: any = await $request('/prod-api/home/kuaixun/kuai/')
    return res.news
  } catch (e) {
    return []
  }
}
