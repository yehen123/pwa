export const tradingStateText = ref('')
// const tradingDateMap: Record<string, number> = {}
// export async function updateTradingState() {
//   const current = $dayjs()

//   const date = current.format('YYYY-MM-DD')
//   if ($utils.is.isUnDef(tradingDateMap[date])) {
//     tradingStateText.value = ''
//     const res = await getIsTradingDate(date)
//     tradingDateMap[date] = res
//   }
//   if (
//     (current.isAfter(`${date} 09:30:00`) && current.isBefore(`${date} 11:30:00`)) ||
//     (current.isAfter(`${date} 13:00:00`) && current.isBefore(`${date} 15:00:00`))
//   ) {
//     tradingStateText.value = '交易中'
//   } else if (current.isAfter(`${date} 11:30:00`) && current.isBefore(`${date} 13:00:00`)) {
//     tradingStateText.value = '盘中休市'
//   } else {
//     tradingStateText.value = '已收盘'
//   }
// }
// export async function getIsTradingDate(date) {
//   const data = await $fetch<{ data: { isTradeDate: 1 | 0 } }>(
//     `https://stockapi.com.cn/v1/base/tradeDate?tradeDate=${date}`
//   )
//   return data.data.isTradeDate
// }
