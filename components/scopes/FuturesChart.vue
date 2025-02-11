<template>
  <div class="h-full">
    <div class="top-tabbar">
      <van-tabs v-model:active="active" :class="{ 'hide-line': active === 1 || active === 2 }">
        <van-tab title="分时"></van-tab>
        <van-tab :title-class="'hidden'" title="5分"></van-tab>
        <van-tab :title-class="'hidden'" title="15分"></van-tab>
        <van-tab title="日K"></van-tab>
        <van-tab title="周K"></van-tab>
        <van-tab title="月K"></van-tab>
      </van-tabs>
      <van-popover
        v-model:show="showPopover"
        placement="bottom-end"
        :actions="minuteList"
        :offset="[-10, 10]"
        @select="handleSelect"
      >
        <template #reference>
          <div class="minute-setting" :class="{ active: active === 1 || active === 2 }">
            分钟
            <van-icon name="setting-o" />
          </div>
        </template>
      </van-popover>
    </div>
    <div v-if="chartType?.type === 'minute'" class="chart-wrap px-4">
      <MinuteChart
        class="flex-1"
        :symbol="props.baseData!.code"
        @requestMinuteData="(...params) => emits('requestMinuteData', ...params)"
        @requestHistoryMinuteData="(...params) => emits('requestHistoryMinuteData', ...params)"
      ></MinuteChart>
      <div v-if="props.baseData!.tradeState === 2" class="chart-right">
        <div v-if="sellList.length" class="trade-detail-row">
          <div>卖1</div>
          <div
            :class="{
              raise: sellList[0].price > props.baseData!.price,
              fall: sellList[0].price < props.baseData!.price,
            }"
          >
            {{ sellList[0].price }}
          </div>
          <div class="text-right pr-4">{{ sellList[0].vol }}</div>
        </div>
        <div v-if="buyList.length" class="trade-detail-row">
          <div>买1</div>
          <div
            :class="{
              raise: buyList[0].price > props.baseData!.price,
              fall: buyList[0].price < props.baseData!.price,
            }"
          >
            {{ buyList[0].price }}
          </div>
          <div class="text-right pr-4">{{ buyList[0].vol }}</div>
        </div>
        <div ref="tContainer" class="trade-success">
          <div class="trade-success-title">
            成交明细
            <img class="arrow-down" src="/public/img/arrow-down.png" />
          </div>
          <div class="trade-success-body">
            <div v-for="(item, index) in currentList.slice(0, sliceCount)" :key="index" class="ts-item">
              <div class="ts-1">
                <div class="pl-2">{{ item.h }}:{{ item.m }}</div>
                <div
                  class="text-center ml-2"
                  :class="{
                    raise: item.price > props.baseData!.price,
                    fall: item.price < props.baseData!.price,
                  }"
                >
                  {{ item.price }}
                </div>
                <div class="text-right pr-2" :class="{ raise: item.cbs === 2, fall: item.cbs === 1 }">
                  {{ item.xvol }}
                </div>
              </div>
              <div class="ts-2">
                <div class="pl-2">:{{ item.s }}</div>
                <div class="text-center ml-2 bg-gray-200" :class="{ raise: item.cbs === 2, fall: item.cbs === 1 }">
                  {{ item.name }}
                </div>
                <div class="text-right pr-2 bg-gray-200">{{ item.xoi }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="chartType?.type === 'kline'" class="chart-wrap p-4">
      <KlineChart
        :symbol="props.baseData!.code"
        :period="chartType.id"
        @klineRequestRealtimeMinuteData="(...params) => emits('klineRequestRealtimeMinuteData', ...params)"
        @klineRequestHistoryMinuteData="(...params) => emits('klineRequestHistoryMinuteData', ...params)"
        @klineRequestHistoryData="(...params) => emits('klineRequestHistoryData', ...params)"
        @klineRequestRealtimeData="(...params) => emits('klineRequestRealtimeData', ...params)"
      ></KlineChart>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MinuteChart from './MinuteChart.vue'
import KlineChart from './KlineChart.vue'
import NP from 'number-precision'
const props = defineProps({
  baseData: Object,
})
const emits = defineEmits([
  'requestMinuteData',
  'requestHistoryMinuteData',
  'klineRequestHistoryMinuteData',
  'klineRequestRealtimeMinuteData',
  'klineRequestHistoryData',
  'klineRequestRealtimeData',
])
const chartType = computed(() => {
  switch (active.value) {
    case 0:
      return {
        type: 'minute',
        id: 1,
      }
    case 1:
      return {
        type: 'kline',
        id: 5,
      }

    case 2:
      return {
        type: 'kline',
        id: 6,
      }

    case 3:
      return {
        type: 'kline',
        id: 0,
      }
    case 4:
      return {
        type: 'kline',
        id: 1,
      }
    case 5:
      return {
        type: 'kline',
        id: 2,
      }
  }
})
const active = ref(0)
const showPopover = ref(false)
// 分钟
const minuteList = ref([
  { text: '5分', value: 1 },
  { text: '15分', value: 2 },
])

function handleSelect(action) {
  if (props.baseData!.netType === 0) {
    active.value = action.value
  }
}
function getTypeName(xoi: number, cbs: number, xvol: number) {
  if (xoi > 0 && Math.abs(xoi) == xvol) {
    return '双开'
  } else if (xoi < 0 && Math.abs(xoi) == xvol) {
    return '双平'
  } else if (cbs == 1 && xoi < 0) {
    return '多平'
  } else if (cbs == 2 && xoi < 0) {
    return '空平'
  } else if (cbs == 2 && xoi > 0) {
    return '多开'
  } else if (cbs == 1 && xoi > 0) {
    return '空开'
  } else if (cbs == 2 && xoi == 0) {
    return '多换'
  } else if (cbs == 1 && xoi == 0) {
    return '空换'
  }

  return ''
}
function generateRandomNumber(noZero = true) {
  // 生成一个0到100之间的随机数，代表百分比
  var randomPercent = Math.random() * 100

  if (randomPercent < 20 && !noZero) {
    // 20%的概率生成0
    return 0
  } else if (randomPercent < 70) {
    // 接下来的50%的概率（即从20%到70%），生成1、2、3中的一个
    return Math.floor(Math.random() * 3) + 1 // 生成1, 2, 或 3
  } else if (randomPercent < 90) {
    // 再接下来的20%的概率（即从70%到90%），生成4、5、6中的一个
    return Math.floor(Math.random() * 3) + 4 // 生成4, 5, 或 6
  } else {
    // 最后的10%的概率，生成7或8中的一个
    return Math.floor(Math.random() * 2) + 7 // 生成7或8
  }
}
const getRandomItem = (price) => {
  let xoi = generateRandomNumber(false)
  if (Math.random() > 0.5 && xoi) {
    xoi = xoi * -1
  }
  const cbs = Math.random() > 0.5 ? 1 : 2
  const xvol = generateRandomNumber(true)
  const name = getTypeName(xoi, cbs, xvol)

  return {
    xoi,
    cbs,
    xvol,
    name,
    price: getChangedPrice(price),
  }
}

const getChangedPrice = (price) => {
  let changes = NP.divide(NP.times(price, generateRandomNumber()), 10000)
  if (Math.random() > 0.5 && changes) {
    changes = changes * -1
  }
  const resPrice = changes + price
  return Number(resPrice.toFixed(2))
}
const getRandomList = (price, h, m, s) => {
  const count = Math.floor(Math.random() * 4)
  let res: any[] = []
  for (let i = 0; i < count; i++) {
    res.push(getRandomItem(price))
  }

  return res.map((item) => {
    return {
      ...item,
      h,
      m,
      s,
    }
  })
}
const currentList = ref<any[]>([])
const sellList = ref<any[]>([])
const buyList = ref<any[]>([])
const initTradeList = () => {
  sellList.value = [
    {
      price: getChangedPrice(props.baseData!.price),
      vol: generateRandomNumber(true),
    },
  ]
  buyList.value = [
    {
      price: getChangedPrice(props.baseData!.price),
      vol: generateRandomNumber(true),
    },
  ]
}
const initCurrentList = () => {
  while (currentList.value.length < 10) {
    const time = currentList.value[currentList.value.length - 1]
      ? $dayjs
          .tz(
            `${$dayjs.tz().format('YYYY-MM-DD')} ${currentList.value[0].h}:${currentList.value[0].m}:${currentList.value[0].s}`
          )
          .subtract(Math.ceil(Math.random() * 2), 's')
      : $dayjs.tz()
    let [h, m, s] = time.format('HH:mm:ss').split(':')
    currentList.value.push(...getRandomList(props.baseData!.price, h, m, s))
  }
}
const startCurrentListChange = () => {
  let [h, m, s] = $dayjs().format('HH:mm:ss').split(':')
  currentList.value.unshift(...getRandomList(props.baseData!.price, h, m, s))
  currentList.value.length = 10
}
let timer
const tContainer = ref()
const sliceCount = ref(0)
const startChange = () => {
  timer = setInterval(() => {
    startCurrentListChange()
    initTradeList()
    if (!sliceCount.value) {
      if (tContainer.value) {
        sliceCount.value = Math.floor((tContainer.value.offsetHeight - 65) / 50) + 1
      }
    }
  }, 1000)
}
onMounted(() => {
  initCurrentList()
  initTradeList()
  startChange()
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="less" scoped>
@tabsHeight: 88px;
.top-tabbar {
  display: flex;
  align-items: center;
  font-size: 28px;
  :deep(.van-tabs) {
    flex: 1;
    &.hide-line {
      .van-tabs__line {
        display: none;
      }
    }
  }
  .minute-setting {
    color: #666;
    font-size: 28px;
    padding-right: 48px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    :deep(.van-icon) {
      font-size: 32px;
      margin-left: 4px;
    }
    &.active {
      color: var(--primary-color);
    }
  }
}
.chart-wrap {
  height: calc(100% - @tabsHeight);
  display: flex;
  .chart-right {
    width: 200px;
  }
}
.trade-detail-row {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  // justify-content: center;
  text-align: center;
  font-size: 22px;
}
.trade-success-title {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  position: relative;
  .arrow-down {
    width: 14px;
    margin-left: 4px;
  }
}
.trade-success {
  overflow: hidden;

  height: calc(100% - 0.8rem);
}
.ts-1,
.ts-2 {
  display: grid;
  grid-template-columns: 30% 50% 20%;
  font-size: 20px;
  line-height: 45px;
}
.text-raise {
  color: #d71409;
}
.text-fall {
  color: #1caa3d;
}
</style>
