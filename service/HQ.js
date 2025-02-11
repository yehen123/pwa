import * as HQChart from 'hqchart'
const init = () => {
  HQChart.Chart.JSConsole.Chart.Log = () => {}
  HQChart.Chart.JSConsole.Complier.Log = () => {}
  // 盘中如果开启自动更新，会轮询调用 networkfilter；判断是否获取新数据放到networkfilter
  // 0=闭市 1=盘前 2=盘中 3=盘后
  HQChart.Chart.MARKET_SUFFIX_NAME.GetMarketStatus = (_symbol) => {
    return 2
  }
  HQChart.Chart.JSChart.GetResource().FrameLogo.Text = null
  const config = useRuntimeConfig()
  if (config.public.theme === 'dark') {
    var blackStyle = HQChart.Chart.HQChartStyle.GetStyleConfig(HQChart.Chart.STYLE_TYPE_ID.BLACK_ID)
    blackStyle.CorssCursorVPenColor = 'rgba(250,250,250,0.8)' //修改垂直线颜色
    HQChart.Chart.JSChart.SetStyle(blackStyle)
  }

  initET()
}
let isInit = false
/**
 *
 * @param {*} el
 * @param {{Symbol,NetworkFilter}} option
 * @returns
 */
export const createChart = (el, option) => {
  if (!isInit) {
    isInit = true
    init()
  }
  var chart = HQChart.Chart.JSChart.Init(el)
  chart.SetOption(option)
  return chart
}
export const initET = () => {
  const GetETTimeData = function (upperSymbol, minuteStringData) {
    let TIME_SPLIT = []
    if (upperSymbol.split('_')[0].endsWith('WE')) {
      TIME_SPLIT = [
        { Start: 900, End: 1300 },
        { Start: 2101, End: 2359 },
      ]
    }

    if (upperSymbol.split('_')[0].endsWith('MA')) {
      TIME_SPLIT = [
        { Start: 0, End: 500 },
        { Start: 1601, End: 2100 },
      ]
    }
    if (upperSymbol.split('_')[0].endsWith('MI')) {
      TIME_SPLIT = [
        { Start: 500, End: 1000 },
        { Start: 1201, End: 1600 },
      ]
    }
    return minuteStringData.CreateTimeData(TIME_SPLIT)
  }
  const GetETData = function (upperSymbol) {
    if (upperSymbol.split('_')[0].endsWith('WE')) {
      const data = {
        //完整模式
        Full: [
          [0, 0, 'RGB(200,200,200)', '09:00'],
          [61, 0, 'RGB(200,200,200)', '10:00'],
          [121, 0, 'RGB(200,200,200)', '11:00'],
          [181, 0, 'RGB(200,200,200)', '12:00'],
          [240, 0, 'RGB(200,200,200)', '21:00'],
          [300, 0, 'RGB(200,200,200)', '22:00'],
          [360, 0, 'RGB(200,200,200)', '23:00'],
          [420, 1, 'RGB(200,200,200)', '23:59'],
        ],
        //简洁模式
        Simple: [
          [0, 0, 'RGB(200,200,200)', '09:00'],
          [241, 1, 'RGB(200,200,200)', '13:00/21:00'],
          [420, 1, 'RGB(200,200,200)', '23:59'],
        ],
        //最小模式
        Min: [
          [0, 0, 'RGB(200,200,200)', '09:00'],
          [241, 1, 'RGB(200,200,200)', '13:00'],
          [420, 1, 'RGB(200,200,200)', '23:59'],
        ],

        Count: 420,
        MiddleCount: 210,

        GetData: function (width) {
          if (width < 200) return this.Min
          else if (width < 450) return this.Simple

          return this.Full
        },
      }
      return data
    }
    if (upperSymbol.split('_')[0].endsWith('MA')) {
      const data = {
        //完整模式
        Full: [
          [0, 0, 'RGB(200,200,200)', '0:00'],
          [61, 0, 'RGB(200,200,200)', '01:00'],
          [121, 0, 'RGB(200,200,200)', '02:00'],
          [181, 0, 'RGB(200,200,200)', '03:00'],
          [241, 1, 'RGB(200,200,200)', '04:00'],
          [300, 0, 'RGB(200,200,200)', '16:00'],
          [360, 0, 'RGB(200,200,200)', '17:00'],
          [420, 0, 'RGB(200,200,200)', '18:00'],
          [480, 1, 'RGB(200,200,200)', '19:00'],
          [540, 1, 'RGB(200,200,200)', '20:00'],
          [600, 1, 'RGB(200,200,200)', '21:00'],
        ],
        //简洁模式
        Simple: [
          [0, 0, 'RGB(200,200,200)', '0:00'],
          [300, 0, 'RGB(200,200,200)', '05:00/16:00'],
          [600, 1, 'RGB(200,200,200)', '21:00'],
        ],
        //最小模式
        Min: [
          [0, 0, 'RGB(200,200,200)', '0:00'],
          [300, 1, 'RGB(200,200,200)', '16:00'],
          [600, 1, 'RGB(200,200,200)', '21:00'],
        ],

        Count: 601,
        MiddleCount: 300,

        GetData: function (width) {
          if (width < 200) return this.Min
          else if (width < 450) return this.Simple

          return this.Full
        },
      }
      return data
    }
    if (upperSymbol.split('_')[0].endsWith('MI')) {
      const data = {
        //完整模式
        Full: [
          [0, 0, 'RGB(200,200,200)', '05:00'],
          [61, 0, 'RGB(200,200,200)', '06:00'],
          [121, 0, 'RGB(200,200,200)', '07:00'],
          [181, 0, 'RGB(200,200,200)', '08:00'],
          [241, 0, 'RGB(200,200,200)', '09:00'],
          [300, 0, 'RGB(200,200,200)', '12:00'],
          [360, 0, 'RGB(200,200,200)', '13:00'],
          [420, 0, 'RGB(200,200,200)', '14:00'],
          [480, 0, 'RGB(200,200,200)', '15:00'],
          [540, 0, 'RGB(200,200,200)', '16:00'],
        ],
        //简洁模式
        Simple: [
          [0, 0, 'RGB(200,200,200)', '05:00'],
          [300, 0, 'RGB(200,200,200)', '10:00/12:00'],
          [540, 0, 'RGB(200,200,200)', '16:00'],
        ],
        //最小模式
        Min: [
          [0, 0, 'RGB(200,200,200)', '0:00'],
          [300, 0, 'RGB(200,200,200)', '12:00'],
          [540, 0, 'RGB(200,200,200)', '16:00'],
        ],

        Count: 541,
        MiddleCount: 271,

        GetData: function (width) {
          if (width < 200) return this.Min
          else if (width < 450) return this.Simple

          return this.Full
        },
      }
      return data
    }
  }
  const GetETDecimal = function (symbol) {
    return 2
  }
  HQChart.Chart.JSChart.GetMinuteTimeStringData().GetET = (upperSymbol) => {
    return GetETTimeData(upperSymbol, HQChart.Chart.JSChart.GetMinuteTimeStringData())
  } //当天所有的交易时间点
  HQChart.Chart.JSChart.GetMinuteCoordinateData().GetETData = (upperSymbol) => {
    return GetETData(upperSymbol)
  } //X轴刻度设置
  HQChart.Chart.MARKET_SUFFIX_NAME.GetETDecimal = (symbol) => {
    return GetETDecimal(symbol)
  }
}
