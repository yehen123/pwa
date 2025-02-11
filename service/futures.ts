export const getFutures = async (id): Promise<Futures.FuturesData> => {
  const { data } = await $request(`/prod-api/home/exp/${id}`)
  return {
    id: data.id,
    name: data.name,
    code: data.code,
    price: data.curValue,
    high: data.maxValue,
    low: data.minValue,
    open: data.startValue,
    close: data.endValue,
    change: data.makeValue,
    changeRate: data.makeRate,
    changeRange: 0,
    vol: data.vValue,
    amount: data.tValue,
    avgPrice: data.avgValue,

    preClose: data.preClose,
    preSettle: data.preSettle,
    time: data.ktime,
    tradePeriods: data.tradePeriods,
    typeGang: data.typeGang,
    netType: Number(data.netType) as 0 | 1,
  }
}
export const getFuturesSearchList = async (keyword: string): Promise<Array<Futures.FuturesData>> => {
  const res = await $request.get(`/prod-api/home/exp/searchlist/${keyword}`)
  return res.data.map((data) => {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      price: data.curValue,
      high: data.maxValue,
      low: data.minValue,
      open: data.startValue,
      close: data.endValue,
      change: data.makeValue,
      changeRate: data.makeRate,
      changeRange: 0,
      vol: data.vValue,
      amount: data.tValue,
      avgPrice: data.avgValue,

      preClose: data.preClose,
      preSettle: data.preSettle,
      time: data.ktime,
      tradePeriods: data.tradePeriods,
    }
  })
}
export const getHomeFuturesList = async (): Promise<Array<Futures.FuturesData>> => {
  const res = await $request(`/prod-api/home/exp/homelist`)
  return res.data.map((data) => {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      price: data.curValue,
      high: data.maxValue,
      low: data.minValue,
      open: data.startValue,
      close: data.endValue,
      change: data.makeValue,
      changeRate: data.makeRate,
      changeRange: 0,
      vol: data.vValue,
      amount: data.tValue,
      avgPrice: data.avgValue,

      preClose: data.preClose,
      preSettle: data.preSettle,
      time: data.ktime,
      tradePeriods: data.tradePeriods,
    }
  })
}
export const getFuturesList = async (type): Promise<Array<Futures.FuturesData>> => {
  try {
    const res = await $request(`/prod-api/home/exp/list/${type}`)
    return res.data.map((data) => {
      return {
        id: data.id,
        name: data.name,
        code: data.code,
        price: data.curValue,
        high: data.maxValue,
        low: data.minValue,
        open: data.startValue,
        close: data.endValue,
        change: data.makeValue,
        changeRate: data.makeRate,
        changeRange: 0,
        vol: data.vValue,
        amount: data.tValue,
        avgPrice: data.avgValue,

        preClose: data.preClose,
        preSettle: data.preSettle,
        time: data.ktime,
        tradePeriods: data.tradePeriods,
      }
    })
  } catch (e) {
    return []
  }
}
export const getMyList = async (): Promise<Array<Futures.FuturesData>> => {
  try {
    const res = await $request(`/prod-api/home/exp/optlist`)
    return res.data.map((data) => {
      return {
        id: data.id,
        name: data.name,
        code: data.code,
        price: data.curValue,
        high: data.maxValue,
        low: data.minValue,
        open: data.startValue,
        close: data.endValue,
        change: data.makeValue,
        changeRate: data.makeRate,
        changeRange: 0,
        vol: data.vValue,
        amount: data.tValue,
        avgPrice: data.avgValue,

        preClose: data.preClose,
        preSettle: data.preSettle,
        time: data.ktime,
        tradePeriods: data.tradePeriods,
      }
    })
  } catch (e) {
    return []
  }
}
export const getTrends = async (id) => {
  const res = await $request(`/prod-api/home/exp/info/${id}`)
  return res.data
}
export const getKlineMinute = async (id, type: 'five' | 'fifteen', beginDate) => {
  const res = await $request(`/prod-api/home/exp/k/${id}/${type}/${beginDate}`)
  return res.data
}
export const getKline = async (id, type: 'day' | 'week' | 'month', beginDate) => {
  const res = await $request(`/prod-api/home/exp/k/${id}/${type}/${beginDate}`)
  return res.data
}
export const getFuturesTypeList = async (): Promise<OptionList> => {
  try {
    const res = await $request('/prod-api/home/dict/list/sys_kk_type')
    return $utils.common.toOptionsList(res.data, { labelKey: 'dictLabel', valueKey: 'dictValue' })
  } catch (e) {
    return []
  }
}
export const getTradeTime = async (id) => {
  const res = await $request(`/prod-api/home/exp/infoTime/${id}`)
  return res.data
}
export const trade = async ({ id, startTime, endTime, gangValue, type, value }) => {
  return await $request.post(`/prod-api/home/sell`, {
    expId: id,
    expStartTime: startTime,
    expEndTime: endTime,
    leverRate: gangValue,
    sellType: type,
    money: value,
  })
}
const DefaultMinuteData = {
  GetMinuteOption() {
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
      AutoUpdateFrequency: 60000,
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
        Left: 0, //左边间距
        Right: 0, //右边间距
        Top: 25,
        Bottom: 25,
        AutoRight: { Blank: 10, MinWidth: 40 },
        AutoLeft: { Blank: 10, MinWidth: 40 },
      },

      //子框架设置
      Frame: [{ SplitCount: 7 }, { SplitCount: 3, Height: 7 }],

      //扩展图形
      ExtendChart: [
        { Name: 'MinuteTooltip' }, //手机端tooltip
      ],
    }

    return option
  },
}
const DefaultKlineData = {
  GetKLineOption: function (period) {
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
      AutoUpdateFrequency: 120000,
      IsApiPeriod: true,
      IsShowRightMenu: false, //是否显示右键菜单
      //CorssCursorTouchEnd:true,
      KLine: {
        DragMode: 1, //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
        Right: 0, //复权 0 不复权 1 前复权 2 后复权
        Period: period, //周期 0 日线 1 周线 2 月线 3 年线
        MaxReqeustDataCount: 1000, //数据个数
        PageSize: 150, //一屏显示多少数据
        KLineDoubleClick: false, //双击分钟走势图
        IsShowTooltip: false, //是否显示K线提示信息
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
  },
}
export { DefaultMinuteData, DefaultKlineData }

export const getTradeState = (tradePeriods) => {
  const periods = tradePeriods?.periods
  if (periods) {
    const lastEndTime = periods[periods.length - 1].e
    const date = $dayjs.tz().format('YYYYMMDDHHmm')
    if (Number(date) > Number(lastEndTime)) {
      return 0 // 已收盘
    }
    if (periods.some((item) => Number(date) >= Number(item.b) && Number(date) <= Number(item.e))) {
      return 2 // 交易中
    }
    return 1 // 盘中休市
  }
  return
}
