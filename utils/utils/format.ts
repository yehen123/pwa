import NP from 'number-precision'
export const ratioToPercentStr = (v) => {
  return NP.times(parseFloat(v), 100) + '%'
}
export const toCurrency = (number, symbol?, places?, thousand?, decimal?) => {
  number = number || 0
  places = !isNaN((places = Math.abs(places))) ? places : 2
  symbol = symbol !== undefined ? symbol : ''
  thousand = thousand || ','
  decimal = decimal || '.'
  const negative = number < 0 ? '-' : ''
  const i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + ''
  let j = i.length
  j = j > 3 ? j % 3 : 0
  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
    (places
      ? decimal +
        Math.abs(number - Number(i))
          .toFixed(places)
          .slice(2)
      : '')
  )
}
export const toChineseCapitalCurrency = (n) => {
  const fraction = ['角', '分']
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟'],
  ]
  const head = n < 0 ? '欠' : ''
  n = Math.abs(n)

  let s = ''

  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}
export const toChinseDigit = (n) => {
  const digit = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const numStr = String(toNumber(n))
  let s = ''
  for (let i = 0; i < numStr.length; i++) {
    s += digit[numStr[i]]
  }
  return s
}
export const toNumber = (v, maxDemical = 2) => {
  // 将 金额/类金额/数字转换 成 数字（最多2位小数）;
  if (v) {
    const s = String(v)
    let num = Number(s.replace(/[^(\d||/.)]/g, ''))
    // 处理负数
    if (s.charAt(0) === '-') {
      num = -num
    }
    if (isNaN(num)) {
      return 0
    } else {
      return Number(num.toFixed(maxDemical))
    }
  } else {
    return 0
  }
}
