import NP from 'number-precision'
/**
 *
 * @param secid 指数代码: 000001
 * 从天天基金获取指数行情
 */
export async function getStockIndexWithTrends(secid: string) {
  try {
    const data = await getStockIndex(secid)
    if (!data) {
      throw new Error('E_NO_DATA')
    }
    const trends = await getTrend(secid, 1)

    return {
      ...data,
      trends,
    }
  } catch (error) {
    return
  }
}
export async function getStockIndex(secid: string) {
  try {
    const data = await $fetch<{
      rc: 0
      rt: 4
      svr: 182481189
      lt: 1
      full: 1
      data: {
        f43: number // 当前
        f44: number // 最高
        f45: number // 最低
        f46: number // 今开
        f57: string // code
        f58: string // name
        f60: number // 昨收
        f86: number // 时间戳（秒）
        f107: number // market
        f113: number // 涨家数
        f114: number // 跌家数
        f115: number // 平家数
        f168: number // 换手
        f169: number // 涨跌点
        f170: number // 涨跌幅
        f171: number // 振幅
        f292: number
      }
    }>('https://push2.eastmoney.com/api/qt/stock/get?=', {
      params: {
        fields: 'f43,f44,f45,f46,f57,f58,f60,f86,f107,f113,f114,f115,f168,f169,f170,f171,f292',
        secid, // 1.000001
        _: Date.now(),
      },
      responseType: 'json',
    })

    return {
      zsz: NP.divide(data.data.f43, 100),
      zg: NP.divide(data.data.f44, 100),
      zd: NP.divide(data.data.f45, 100),
      jk: NP.divide(data.data.f46, 100),
      zindexCode: data.data.f57,
      name: data.data.f58,
      zs: NP.divide(data.data.f60, 100),
      hs: NP.divide(data.data.f168, 100),
      zdd: NP.divide(data.data.f169, 100),
      zdf: NP.divide(data.data.f170, 100),
      zf: NP.divide(data.data.f171, 100),
      szjs: data.data.f113,
      xdjs: data.data.f114,
      ppjs: data.data.f115,
      type: data.data.f107,
      code: `${data.data.f107}.${data.data.f57}`,
      isopen: $utils.stock.dealTradeStae(data.data.f292).isopen,
      statetxt: $utils.stock.dealTradeStae(data.data.f292).txt,
      time: $dayjs.unix(data.data.f86).format('YYYY-MM-DD HH:mm:ss'),
    }
  } catch (error) {
    return
  }
}
export async function getTrend(code: string, ndays: number) {
  try {
    const data = await $fetch<{
      rc: 0
      rt: 10
      svr: 2887136043
      lt: 1
      full: 1
      data: {
        code: '399293'
        market: 0
        type: 5
        status: 0
        name: '创业大盘'
        decimal: 2
        preSettlement: 0.0
        preClose: 5547.32
        beticks: '33300|34200|54000|34200|41400|46800|54000'
        trendsTotal: 482
        time: 1617348843
        trends: ['2021-04-01 09:30,5441.55,34310,5441.553']
      }
    }>('https://push2his.eastmoney.com/api/qt/stock/trends2/get', {
      params: {
        secid: code,
        ndays,
        iscr: 0,
        fields1: 'f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11',
        fields2: 'f51,f53,f56,f58',
        _: Date.now(),
      },
      responseType: 'json',
    })
    return (data.data?.trends || []).map((_) => {
      const [time, price, cjl] = _.split(',')
      return {
        time,
        price: Number(price),
        cjl: Number(cjl),
      }
    })
  } catch (error) {
    return []
  }
}
//

const DefaultStockIndexData: any = {}

DefaultStockIndexData.GetMinuteOption = function () {
  const option = {
    Type: '分钟走势图', //创建图形类型
    //Type:'分钟走势图横屏',
    OverlayIndex: [],
    //窗口指标,分钟走势图，默认有走势图和成交量图，后面是追加的
    Windows: [
      // {
      //   index: 'MACD',
      //   Modify: false,
      //   Change: false,
      //   Close: false,
      // },
    ],

    Symbol: '',
    IsAutoUpdate: true, //是自动更新数据
    AutoUpdateFrequency: 20000,
    DayCount: 1, //1 最新交易日数据 >1 多日走势图
    IsShowRightMenu: false, //是否显示右键菜单
    //CorssCursorTouchEnd:true,

    CorssCursorInfo: { Left: 1, Right: 1 },

    MinuteLine: {
      IsDrawAreaPrice: true, //是否画价格面积图
      IsShowAveragePrice: true, //不显示均线
    },

    //边框
    Border: {
      Left: 40, //左边间距
      Right: 40, //右边间距
      Top: 25,
      Bottom: 25,
      AutoRight: { Blank: 10, MinWidth: 40 },
      AutoLeft: { Blank: 10, MinWidth: 40 },
    },

    //子框架设置
    Frame: [{ SplitCount: 5 }, { SplitCount: 3 }],

    //扩展图形
    ExtendChart: [
      { Name: 'MinuteTooltip' }, //手机端tooltip
    ],
  }

  return option
}

DefaultStockIndexData.GetKLineOption = function () {
  const option = {
    Type: '历史K线图', //创建图形类型

    //窗口指标
    Windows: [
      { Index: 'MA', Modify: false, Change: false, Close: false },
      { Index: 'VOL', Modify: false, Change: false, Close: false },
      // { Index: 'MACD', Modify: false, Change: false, Close: false },
    ],

    Symbol: '',
    IsAutoUpdate: true, //是自动更新数据
    AutoUpdateFrequency: 15000,
    IsApiPeriod: true,
    IsShowRightMenu: false, //是否显示右键菜单
    //CorssCursorTouchEnd:true,

    KLine: {
      DragMode: 1, //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
      Right: 0, //复权 0 不复权 1 前复权 2 后复权
      Period: 0, //周期 0 日线 1 周线 2 月线 3 年线
      MaxReqeustDataCount: 1000, //数据个数
      PageSize: 150, //一屏显示多少数据
      KLineDoubleClick: false, //双击分钟走势图
      IsShowTooltip: true, //是否显示K线提示信息
      DrawType: 0,
      RightSpaceCount: 2,
    },

    CorssCursorInfo: { Left: 0, Right: 1 },

    //标题设置
    KLineTitle: {
      IsShowName: true, //不显示股票名称
      IsShowSettingInfo: false, //不显示周期/复权
    },

    //边框
    Border: {
      Left: 2, //左边间距
      Right: 2, //右边间距
      Top: 25,
      Bottom: 25,
      AutoRight: { Blank: 10, MinWidth: 40 },
    },

    //子框架设置
    Frame: [
      {
        SplitCount: 5,
        IsShowLeftText: false,
        Custom: [
          {
            Type: 0,
            Position: 'right',
          },
        ],
      },
      { SplitCount: 3, IsShowLeftText: false },
      { SplitCount: 3, IsShowLeftText: false },
    ],

    //扩展图形
    ExtendChart: [
      { Name: 'KLineTooltip' }, //手机端tooltip
    ],
  }

  return option
}

DefaultStockIndexData.GetMinuteDayMenu = function () {
  const data = [
    { Name: '1日', ID: 1 },
    { Name: '2日', ID: 2 },
    { Name: '3日', ID: 3 },
    { Name: '4日', ID: 4 },
    { Name: '5日', ID: 5 },
  ]

  return data
}

DefaultStockIndexData.GetKLinePeriodMenu = function () {
  const data = [
    { Name: '日线', ID: 0 },
    { Name: '周线', ID: 1 },
    { Name: '月线', ID: 2 },

    //{Name:"1分钟", ID: 4 },
    { Name: '5分钟', ID: 5 },
    { Name: '15分钟', ID: 6 },
    { Name: '30分钟', ID: 7 },
    { Name: '60分钟', ID: 8 },
  ]

  return data
}

DefaultStockIndexData.GetKLineRightMenu = function () {
  const data = [
    { Name: '不复权', ID: 0 },
    { Name: '前复权', ID: 1 },
    { Name: '后复权', ID: 2 },
  ]

  return data
}
export { DefaultStockIndexData }
