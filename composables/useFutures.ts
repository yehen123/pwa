import { getFutures, getTrends, getKlineMinute, getKline, getTradeState } from '@/service/futures'

export const useFutures = (id) => {
  const baseData = ref<Futures.FuturesData>()
  let trends: string[] = []
  const klineDay = {
    preKPrice: 0,
    klines: [] as any[],
  }
  const klineWeek = {
    preKPrice: 0,
    klines: [] as any[],
  }
  const klineMonth = {
    preKPrice: 0,
    klines: [] as any[],
  }
  const kline5Minute = {
    preKPrice: 0,
    klines: [] as any[],
  }
  const kline15Minute = {
    preKPrice: 0,
    klines: [] as any[],
  }
  const updateBaseData = async () => {
    const data = await getFutures(id)
    baseData.value = data
  }
  const updateTrends = async () => {
    // 交易中，或者初始化时才去获取
    if (baseData.value?.tradeState === 2 || !trends.length) {
      const data = await getTrends(id)
      trends = data.trends
      baseData.value!.price = data.dayCurValue
      baseData.value!.change = data.dayValue
      baseData.value!.changeRate = data.dayRate
      baseData.value!.high = data.dayMax
      baseData.value!.low = data.dayMin
      baseData.value!.vol = data.dayVvalue
      baseData.value!.time = data.ktime
      baseData.value!.tradePeriods = data.tradePeriods
    }
  }
  const bootHqTrends = () => {
    const stock = {
      symbol: baseData.value!.code,
      name: baseData.value!.name,
      minute: [] as any[],
      yclose: baseData.value!.preClose,
      yclearing: baseData.value!.preSettle,
      date: 0,
    }
    for (let i = 0; i < trends.length; ++i) {
      const strItem = trends[i]
      const item = strItem.split(',')

      const day = $dayjs(item[0])
      const date = Number(day.format('YYYYMMDD'))
      const time = Number(day.format('HHmm'))

      const stockItem = {
        date: date,
        time: time,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        price: parseFloat(item[4]),
        vol: parseFloat(item[5]),
        amount: parseFloat(item[6]),
        avprice: parseFloat(item[7]),
      }

      stockItem.vol *= 100

      stock.date = date
      stock.minute.push(stockItem)
    }
    return {
      code: 0,
      stock: [stock],
    }
  }
  const updateKlineMinute = async (period) => {
    const state = getTradeState(baseData.value?.tradePeriods)
    if (period === 5) {
      if (state === 2 || !kline5Minute.klines.length) {
        const res = await getKlineMinute(id, 'five', '')
        kline5Minute.klines = res.klines
      }
    }
    if (period === 6) {
      if (state === 2 || !kline15Minute.klines.length) {
        const res = await getKlineMinute(id, 'fifteen', '')
        kline15Minute.klines = res.klines
      }
    }
  }
  const bootHqKlineMinute = (period) => {
    const hqChartData = { code: 0, data: [] as any[], symbol: baseData.value!.code, name: baseData.value!.name }
    let data = {
      preKPrice: 0,
      klines: [] as any[],
    }
    if (period === 5) {
      data = kline5Minute
    }
    if (period === 6) {
      data = kline15Minute
    }
    let yClose = data.preKPrice
    for (let i = 0; i < data.klines.length; ++i) {
      const strItem = data.klines[i]
      const item = strItem.split(',')
      const today = new Date(Date.parse(item[0]))
      const date = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
      const time = today.getHours() * 100 + today.getMinutes()

      const open = parseFloat(item[1])
      const close = parseFloat(item[2])
      const high = parseFloat(item[3])
      const low = parseFloat(item[4])
      const vol = parseFloat(item[5]) * 100
      const amount = parseFloat(item[6])

      const newItem = [date, yClose, open, high, low, close, vol, amount, time]
      hqChartData.data.push(newItem)

      yClose = close
    }
    return hqChartData
  }
  const updateKline = async (period) => {
    if (period === 0) {
      const res = await getKline(id, 'day', '')
      klineDay.klines = res.klines
    }
    if (period === 1) {
      const res = await getKline(id, 'week', '')
      klineWeek.klines = res.klines
    }
    if (period === 2) {
      const res = await getKline(id, 'month', '')
      klineMonth.klines = res.klines
    }
  }
  const bootHqKline = (period) => {
    const hqChartData = { code: 0, data: [] as any[], symbol: baseData.value!.code, name: baseData.value!.name }
    let data = {
      preKPrice: 0,
      klines: [] as any[],
    }
    if (period === 0) {
      data = klineDay
    }
    if (period === 1) {
      data = klineWeek
    }
    if (period === 2) {
      data = klineMonth
    }
    let yClose = data.preKPrice
    for (let i = 0; i < data.klines.length; ++i) {
      const strItem = data.klines[i]
      const item = strItem.split(',')
      const today = new Date(Date.parse(item[0]))
      const date = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
      const time = today.getHours() * 100 + today.getMinutes()

      const open = parseFloat(item[1])
      const close = parseFloat(item[2])
      const high = parseFloat(item[3])
      const low = parseFloat(item[4])
      const vol = parseFloat(item[5]) * 100
      const amount = parseFloat(item[6])

      const newItem = [date, yClose, open, high, low, close, vol, amount, time]
      hqChartData.data.push(newItem)

      yClose = close
    }
    return hqChartData
  }
  const startBaseStateWatcher = () => {
    setInterval(() => {
      const state = getTradeState(baseData.value?.tradePeriods)
      if (baseData.value) {
        baseData.value.tradeState = state
      }
    }, 1000)
  }
  onMounted(() => {
    startBaseStateWatcher()
  })
  return {
    updateBaseData,
    getTradeState,
    baseData,

    updateTrends,
    bootHqTrends,

    updateKline,
    bootHqKline,
    updateKlineMinute,
    bootHqKlineMinute,
  }
}
