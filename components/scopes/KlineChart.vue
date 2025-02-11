<template>
  <div class="box">
    <div id="hqchart_kline" ref="hqchartEl" class="hqchart"></div>
  </div>
</template>
<script setup>
import { debounce } from 'lodash-es'
import { createChart } from '~/service/HQ'
import { DefaultKlineData } from '@/service/futures'

const props = defineProps({
  symbol: String,
  period: Number,
})

const emits = defineEmits([
  'klineRequestHistoryMinuteData',
  'klineRequestRealtimeMinuteData',
  'klineRequestHistoryData',
  'klineRequestRealtimeData',
])
const hqchartEl = ref()
let hqChartInstance = null
const initChart = () => {
  const option = DefaultKlineData.GetKLineOption(props.period)
  option.Symbol = props.symbol
  option.NetworkFilter = (data, callback) => {
    // 需要禁止默认请求
    data.PreventDefault = true
    // console.log(data)
    switch (data.Name) {
      case 'KLineChartContainer::ReqeustHistoryMinuteData':
        // EastMoney.HQData.NetworkFilter(data, callback)
        emits('klineRequestHistoryMinuteData', data, callback)
        break
      case 'KLineChartContainer::RequestMinuteRealtimeData':
        emits('klineRequestRealtimeMinuteData', data, callback)
        break
      case 'KLineChartContainer::RequestHistoryData':
        emits('klineRequestHistoryData', data, callback)
        break
      case 'KLineChartContainer::RequestRealtimeData':
        emits('klineRequestRealtimeData', data, callback)
    }
    // console.log(data)
    // this.NetworkFilter(data, callback)
  } //网络请求回调函数
  hqChartInstance = createChart(hqchartEl.value, option)
  // hqChartInstance.ChangePeriod(props.period)
  const onSize = () => {
    hqChartInstance?.OnSize()
  }

  window.onresize = debounce(onSize, 200)
}
watch(
  () => props.period,
  (v) => {
    hqChartInstance.ChangePeriod(v)
  }
)
onMounted(() => {
  initChart()
})
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  overflow: hidden;
  flex: 1;
}
.hqchart {
  height: 100%;
  background-color: var(--th-bg);
}
</style>
