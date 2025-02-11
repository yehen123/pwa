const GetInternalSymbol = function (symbol) {
  const aryData = symbol.split('.')
  const arySymbol = aryData[0].split('_')
  const market = parseInt(arySymbol[1])
  let internalSymbol = arySymbol[0]

  if (internalSymbol.indexOf('-') > 0) {
    const aryValue = internalSymbol.split('-')
    internalSymbol = aryValue[1]
  }

  return { Market: market, Symbol: internalSymbol }
}
export const getEastMoneySecid = function (symbol) {
  const internalSymbol = GetInternalSymbol(symbol)
  return `${internalSymbol.Market}.${internalSymbol.Symbol}`
}
/** 交易状态 */
export function dealTradeStae(input: number) {
  const returnojb = {
    txt: '',
    isopen: false,
  }
  switch (input) {
    case 1:
      returnojb.txt = '开盘竞价'
      returnojb.isopen = true
      break
    case 2:
      returnojb.txt = '交易中'
      returnojb.isopen = true
      break
    case 3:
      returnojb.txt = '盘中休市'
      break
    case 4:
      returnojb.txt = '收盘竞价'
      break
    case 5:
      returnojb.txt = '已收盘'
      break
    case 6:
      returnojb.txt = '停牌'
      break
    case 7:
      returnojb.txt = '退市'
      break
    case 8:
      returnojb.txt = '暂停上市'
      break
    case 9:
      returnojb.txt = '未上市'
      break
    case 10:
      returnojb.txt = '未开盘'
      break
    case 11:
      returnojb.txt = '盘前' //美股
      returnojb.isopen = true
      break
    case 12:
      returnojb.txt = '盘后' //美股
      returnojb.isopen = true
      break
    case 13:
      returnojb.txt = '休市'
      break
    case 14:
      returnojb.txt = '盘中停牌'
      break
    case 15:
      returnojb.txt = '非交易代码'
      break
    case 16:
      returnojb.txt = '波动性中断'
      break
    case 17:
      returnojb.txt = '盘后交易启动' //沪深
      returnojb.isopen = true
      break
    case 18:
      returnojb.txt = '盘后集中撮合交易' //沪深
      returnojb.isopen = true
      break
    case 19:
      returnojb.txt = '盘后固定价格交易' //沪深
      returnojb.isopen = true
      break
    default:
      break
  }

  return returnojb
}
