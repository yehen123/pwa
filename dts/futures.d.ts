declare namespace Futures {
  interface FuturesData {
    id: string // id....
    name: string // 名称
    code: string // 代码
    price: number // 当前
    high: number // 最高
    low: number // 最低
    open: number // 开盘
    close: number // 收盘
    change: number // 涨跌点数
    changeRate: number // 涨跌幅度
    changeRange: number // 振幅
    vol: number // 成交量
    amount: number // 交易额
    avgPrice: number // 均价

    preClose: number // 昨日收盘
    preSettle: number // 昨结算
    time: string // 更新时间

    tradePeriods: {
      pre: null
      periods: Array<{ b: string; e: string }>
      after: null
    }
    tradeState?: 0 | 1 | 2 // 0 收盘 1 盘中休市 2 交易中

    typeGang?: string // 杠杆倍数
    netType: 0 | 1 // 是否东方财富数据
  }
}
