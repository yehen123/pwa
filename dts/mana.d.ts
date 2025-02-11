declare namespace Mana {
  interface ManaData {
    id: number // 产品id
    buyFlag: boolean // 是否已购买
    yearRate: number // 年利率
    monthRate: number // 月利率
    dayRate: number // 日利率
    feeRate: number // 盈利手续费
    feeRateBuy: number // 买入手续费
    feeRateBack: number // 赎回手续费
    name: string // 产品名称
    info: string // 产品介绍
    day: number // 赎回时间
    minValue: number // 最低购买
    type: '0' | '1' // 0 期货理财 1 零钱宝
    cal: '0' | '1' // 0 永续合约 1 到期赎回
    calItem: '0' | '1' // 0 每日利息到余额 1 记账赎回一起返回
  }
}
