<template>
  <div class="box">
    <div ref="right" class="right">
      <div ref="rightTab" class="rightTab">
        <div class="btn showMinute" :class="{ active: chartType == 'minute' }" @click="changeRightContent('minute')">
          分时图
        </div>
        <div class="btn showKline" :class="{ active: chartType == 'kline' }" @click="changeRightContent('kline')">
          K线图
        </div>
      </div>
      <div ref="rightContent" class="rightContent">
        <div v-show="chartType == 'minute'" class="contentBox">
          <div ref="minute_periodWrap" class="periodWrap">
            <div class="btnGroup">
              <div
                v-for="(item, index) in MinuteDayMenu"
                :key="item.ID"
                class="btn"
                :class="{ active: MinuteDayIndex == index }"
                @click="OnClickMinuteDayMenu(index, item)"
              >
                {{ item.Name }}
              </div>
            </div>
          </div>

          <div id="hqchart_minute" ref="kline" class="hqchart"></div>
        </div>

        <div v-show="chartType == 'kline'" class="contentBox">
          <div ref="kline_periodWrap" class="periodWrap kline_periodWrap">
            <div class="btnGroup">
              <div
                v-for="(item, index) in KLinePeriodMenu"
                :key="item.ID"
                class="btn"
                :class="{ active: KLinePeriodIndex == index }"
                @click="OnClickKLinePeriodMenu(index, item)"
              >
                {{ item.Name }}
              </div>
            </div>
          </div>

          <div id="hqchart_kline" ref="kline2" class="hqchart"></div>
        </div>
      </div>
    </div>

    <!-- <div class="right" ref="kline_right" >

      </div> -->
  </div>
</template>

<script>
import { debounce } from 'lodash-es'
import * as HQChart from 'hqchart'

import EastMoney from '@/service/HQData.js'
import { DefaultStockIndexData } from '@/service/stock'

export default {
  props: {
    symbol: {
      required: true,
      type: String,
    },
    isopen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    var data = {
      MinuteDayMenu: DefaultStockIndexData.GetMinuteDayMenu(),
      MinuteDayIndex: 0,

      KLinePeriodMenu: DefaultStockIndexData.GetKLinePeriodMenu(),
      KLinePeriodIndex: 0,

      KLineRightMenu: DefaultStockIndexData.GetKLineRightMenu(),
      KLineRightIndex: 0,

      Symbol: this.symbol, //HQChart内部编码美股加后缀.usa AAPL.usa
      Chart: null, //图形控件  分时图
      KLineChart: null, //图形控件  K线图

      chartType: 'minute',
    }

    return data
  },

  mounted() {
    this.OnSize()
    this.initChart()
    this.$nextTick(() => {
      this.CreateMinuteChart()
      this.CreateKLineChart()
    })

    window.onresize = debounce(this.OnSize, 200)
  },

  methods: {
    async OnSize() {
      if (this.Chart) this.Chart.OnSize()
      if (this.KLineChart) this.KLineChart.OnSize()
    },

    changeRightContent(type) {
      this.chartType = type

      this.$nextTick(() => {
        this.OnSize()
      })
    },

    initChart() {
      HQChart.Chart.MARKET_SUFFIX_NAME.GetMarketStatus = (_symbol) => {
        return this.isopen ? 2 : 0
      }
      HQChart.Chart.JSChart.GetResource().FrameLogo.Text = null
      EastMoney.HQData.SetMinuteChartCoordinate()
    },

    CreateMinuteChart() {
      if (this.Chart) return

      var option = DefaultStockIndexData.GetMinuteOption()
      option.Symbol = this.Symbol
      option.NetworkFilter = (data, callback) => {
        this.NetworkFilter(data, callback)
      } //网络请求回调函数

      var chart = HQChart.Chart.JSChart.Init(this.$refs.kline)
      chart.SetOption(option)
      this.Chart = chart
    },

    CreateKLineChart() {
      if (this.KLineChart) return

      var option = DefaultStockIndexData.GetKLineOption()
      option.Symbol = this.Symbol
      option.NetworkFilter = (data, callback) => {
        this.NetworkFilter(data, callback)
      } //网络请求回调函数

      var chart = HQChart.Chart.JSChart.Init(this.$refs.kline2)
      chart.SetOption(option)
      this.KLineChart = chart
    },

    OnClickMinuteDayMenu(index, item) {
      //分时图天数
      this.MinuteDayIndex = index
      this.Chart.ChangeDayCount(item.ID)
    },

    OnClickKLinePeriodMenu(index, item) {
      //K线周期
      this.KLinePeriodIndex = index
      this.KLineChart.ChangePeriod(item.ID)
    },

    NetworkFilter(data, callback) {
      //第3方数据替换接口
      EastMoney.HQData.Log('[HQChartDemo::NetworkFilter] data', data)

      switch (data.Name) {
        //分时图数据对接
        case 'MinuteChartContainer::RequestMinuteData':
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        case 'MinuteChartContainer::RequestHistoryMinuteData':
          EastMoney.HQData.NetworkFilter(data, callback)
          break

        case 'KLineChartContainer::RequestHistoryData': //日线全量数据下载
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        case 'KLineChartContainer::RequestRealtimeData': //日线实时数据更新
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        case 'KLineChartContainer::RequestFlowCapitalData': //流通股本
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        case 'KLineChartContainer::ReqeustHistoryMinuteData': //分钟全量数据下载
          EastMoney.HQData.NetworkFilter(data, callback)
          break
        case 'KLineChartContainer::RequestMinuteRealtimeData': //分钟增量数据更新
          EastMoney.HQData.NetworkFilter(data, callback)
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
@animation-duration: 0.3s;
.box {
  width: 100%;
  height: 100%;
  // display: flex;
  position: relative;
  overflow: hidden;

  .right {
    position: absolute;
    top: 0;
  }

  .right {
    left: 0;
    width: calc(100%);
    height: 100%;
    @rightTabHeight: 60px;
    display: flex;
    flex-direction: column;

    .rightTab {
      height: @rightTabHeight;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      // flex-direction: column;

      > .btn {
        cursor: pointer;
        width: 100%;
        text-align: center;
        color: #bcbfc4;

        &:first-child {
          padding-right: 60px;
          text-align: right;
        }

        &:last-child {
          padding-left: 60px;
          text-align: left;
        }

        &:hover,
        &.active {
          color: #ff6900;
        }
      }
    }

    .rightContent {
      height: calc(100% - @rightTabHeight);
      width: 100%;

      .contentBox {
        height: 100%;
      }
    }

    .btnGroup {
      border: 1px solid #ccc;
      color: #bcbfc4;
      display: flex;

      .btn {
        height: 40px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ccc;
        cursor: pointer;

        &:last-child {
          border-right: none;
        }

        &:hover,
        &.active {
          color: #ff6900;
        }
      }
    }

    // .el-button-group{
    //   width: 100%;
    //   display: flex;

    //   .el-button{
    //     flex: 1;
    //   }
    // }

    #hqchart_minute {
      height: calc(100% - @rightTabHeight);

      position: relative;
    }

    #hqchart_kline {
      height: calc(100% - @rightTabHeight);

      position: relative;
    }

    .statementWrap {
      padding: 10px;
      font-size: 12px;
      color: #de432d;
      line-height: 20px;
      text-align: center;
    }
  }
}
</style>
