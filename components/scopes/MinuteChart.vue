<template>
  <div class="box">
    <div id="hqchart_minute" ref="hqchartEl" class="hqchart"></div>
  </div>
</template>
<script setup>
import { debounce } from 'lodash-es'
import { createChart } from '~/service/HQ'
import { DefaultMinuteData } from '@/service/futures'

const props = defineProps({
  symbol: String,
})

const emits = defineEmits(['requestMinuteData'])
const hqchartEl = ref()
let hqChartInstance = null
const initChart = () => {
  const option = DefaultMinuteData.GetMinuteOption()
  option.Symbol = props.symbol
  option.NetworkFilter = (data, callback) => {
    // 需要禁止默认请求
    data.PreventDefault = true
    switch (data.Name) {
      case 'MinuteChartContainer::RequestMinuteData':
        // EastMoney.HQData.NetworkFilter(data, callback)
        emits('requestMinuteData', data, callback)
        break
    }
    // console.log(data)
    // this.NetworkFilter(data, callback)
  } //网络请求回调函数
  hqChartInstance = createChart(hqchartEl.value, option)
  const onSize = debounce(() => {
    hqChartInstance?.OnSize()
  }, 200)

  const resizeObserver = new ResizeObserver(() => {
    onSize()
  })
  resizeObserver.observe(hqchartEl.value)
}
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
