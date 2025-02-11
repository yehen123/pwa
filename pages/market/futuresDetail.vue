<template>
  <div class="ui-page">
    <div v-if="baseData" class="ui-content ui-content-auto-scroll">
      <div class="ui-content-fix">
        <div class="topbar">
          <div class="tobbar-back" @click="router.back()">
            <van-icon name="arrow-left"></van-icon>
          </div>
          <div class="f-name">{{ baseData.name }}</div>
          <div class="f-code">
            {{ baseData.code.split('_')[0] }}
          </div>

          <div class="f-add" @click="handleAddMyList">
            <template v-if="!isInMyList">
              <van-icon name="plus" />
              添加自选
            </template>
            <template v-else>
              <van-icon name="minus" />
              移除自选
            </template>
          </div>
          <div class="topbar-right">
            <div class="top-action">
              <van-icon name="search" />
            </div>
          </div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="f-data">
          <div class="f-data-left">
            <div :class="baseData.changeRate >= 0 ? 'raise' : 'fall'">
              <h3 class="text-3xl font-medium">
                {{ baseData.price }}
              </h3>
              <div class="flex">
                <div class="text-sm">{{ baseData.change }}</div>
                <div class="text-sm ml-4">
                  {{
                    baseData.changeRate === null
                      ? ''
                      : baseData.changeRate >= 0
                        ? `+${baseData.changeRate}%`
                        : `${baseData.changeRate}%`
                  }}
                </div>
              </div>
            </div>

            <div v-if="baseData.tradeState !== undefined" class="f-status">
              <div class="f-status-text">
                <span v-if="baseData.tradeState === 0">已收盘</span>
                <span v-if="baseData.tradeState === 1">盘中休市</span>
                <span v-if="baseData.tradeState === 2">交易中</span>
              </div>
              <div class="f-time">{{ baseData.time }}</div>
            </div>
          </div>

          <div class="f-grid">
            <div class="f-item">
              <div class="f-title">今开</div>
              <div class="f-content" :class="baseData.open >= baseData.preSettle ? 'raise' : 'fall'">
                {{ baseData.open }}
              </div>
            </div>
            <div class="f-item">
              <div class="f-title">最高</div>
              <div class="f-content" :class="baseData.high >= baseData.preSettle ? 'raise' : 'fall'">
                {{ baseData.high }}
              </div>
            </div>
            <div class="f-item">
              <div class="f-title">均价</div>
              <div class="f-content">{{ baseData.avgPrice }}</div>
            </div>
            <div class="f-item">
              <div class="f-title">昨结</div>
              <div class="f-content">{{ baseData.preSettle }}</div>
            </div>
            <div class="f-item">
              <div class="f-title">最低</div>
              <div class="f-content">{{ baseData.low }}</div>
            </div>
            <div v-if="baseData.netType === 0" class="f-item">
              <div class="f-title">成交</div>
              <div class="f-content">{{ baseData.vol }}</div>
            </div>
          </div>
        </div>
        <div class="f-chart">
          <ClientOnly>
            <FuturesChart
              :baseData="baseData"
              @requestMinuteData="requestMinuteData"
              @requestHistoryMinuteData="requestHistoryMinuteData"
              @klineRequestHistoryMinuteData="klineRequestHistoryMinuteData"
              @klineRequestRealtimeMinuteData="klineRequestRealtimeMinuteData"
              @klineRequestHistoryData="klineRequestHistoryData"
              @klineRequestRealtimeData="klineRequestRealtimeData"
            ></FuturesChart>
          </ClientOnly>
        </div>
      </div>
      <div class="ui-content-fix">
        <div class="bottomBar">
          <div class="bottom-left">
            <van-button
              color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
              class="bottom-submit-btn"
              round
              @click="toTrade"
            >
              交易
            </van-button>
          </div>
          <div class="bottom-right">
            <div class="nav-list">
              <div class="nav-item" @click="navigateTo('/')">
                <div class="nav-icon">
                  <img src="/img/bottom-icon-follow.png" alt="" />
                </div>
                <div class="nav-text">首页</div>
              </div>
              <div class="nav-item" @click="navigateTo('/market')">
                <div class="nav-icon">
                  <img src="/img/bottom-icon-condition.png" alt="" />
                </div>
                <div class="nav-text">行情</div>
              </div>
              <div class="nav-item" @click="navigateTo('/mine')">
                <div class="nav-icon">
                  <img src="/img/bottom-icon-flash.png" alt="" />
                </div>
                <div class="nav-text">资产</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FuturesChart from '~/components/scopes/FuturesChart.vue'

const router = useRouter()
const route = useRoute()
const query = route.query as { id: string }
const userStore = useUserStore()
const isInMyList = computed(() => {
  return userStore.userInfo.choose?.split(',').includes(query.id)
})
const handleAddMyList = async () => {
  let list: string[] = userStore.userInfo.choose?.split(',') || []
  if (isInMyList.value) {
    list = list.filter((item) => item !== query.id)
  } else {
    list.unshift(query.id)
  }
  await $request.post('/prod-api/home/user/upOpt', { opt: list.join(',') })
  await userStore.updateUserInfo()
  $message.success('操作成功')
}
useHead({
  title: '',
})
const {
  baseData,
  updateBaseData,
  updateTrends,
  bootHqTrends,
  updateKlineMinute,
  bootHqKlineMinute,
  updateKline,
  bootHqKline,
} = useFutures(query.id)

const requestMinuteData = async (_req, callback) => {
  // 当日分时图
  await updateTrends()
  callback(bootHqTrends())
}
const requestHistoryMinuteData = async (_req, _callback) => {
  // 多日分时图
}
const klineRequestHistoryMinuteData = async (_req, callback) => {
  // 分钟维度k线 （1分钟线、5分钟线...），获取历史数据
  const period = _req.Request.Data.period
  await updateKlineMinute(period)
  callback(bootHqKlineMinute(period))
}
const klineRequestRealtimeMinuteData = async (_req, callback) => {
  // 分钟维度k线（1分钟线、5分钟线...） ，获取更新数据
  const period = _req.Request.Data.period
  // var dateRange = _req.Self.ChartPaint[0].Data.GetDateRange()
  // console.log(dateRange)
  await updateKlineMinute(period)
  callback(bootHqKlineMinute(period))
}
const klineRequestHistoryData = async (_req, callback) => {
  const period = _req.Request.Data.period
  // 日维度k线（日线、周线、月线） ，获取历史数据
  await updateKline(period)
  callback(bootHqKline(period))
}
const klineRequestRealtimeData = async (_req, _callback) => {}
onMounted(() => {
  updateBaseData()
})
const toTrade = () => {
  router.push({
    path: '/trade/doTrade/futures',
    query: {
      id: query.id,
    },
  })
}
</script>
<style lang="less" scoped>
.topbar {
  height: 96px;
  display: flex;
  align-items: baseline;
  padding: 28px 32px 0;
  position: relative;
  .tobbar-back {
    margin-left: -10px;
    margin-right: 16px;
    :deep(.van-icon) {
      font-size: 40px;
      font-weight: bold;
    }
  }
  .f-name {
    color: #333333cc;
    font-size: 36px;
    font-weight: bold;
  }
  .f-code {
    margin-left: 16px;
    color: #333333cc;
    font-size: 24px;
  }
  .f-add {
    margin-left: 32px;
    color: #fd9a16;
    display: flex;
    align-items: center;
    gap: 8px;
    :deep(.van-icon) {
      border: 2px solid #fd9a16;
      padding: 2px;
      font-size: 24px;
      display: block;
      margin-top: -2px;
    }
  }
  .topbar-right {
    position: absolute;
    right: 32px;
    .top-action {
      font-size: 44px;
      display: flex;
      align-items: center;
    }
  }
}
.f-data {
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  color: #000;
  padding-bottom: 32px;

  .f-title {
    color: #333333;
    font-size: 24px;
  }
  .f-content {
    font-size: 26px;
  }
  .f-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0 40px;
  }
}
.f-status {
  display: flex;
  align-items: center;
  background: #ffe8e8;
  margin-top: 8px;
  line-height: 36px;
  white-space: nowrap;

  .f-status-text {
    color: #f54444;
    font-size: 20px;
    position: relative;
    padding-left: 8px;
    height: 36px;
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: -16px;
      width: 0;
      height: 0;
      border-left: 18px solid #ffe8e8;
      border-top: 18px solid #ffdada;
      border-bottom: 18px solid #ffdada;
      z-index: 1;
    }
  }
  .f-time {
    color: #666;
    font-size: 20px;
    background: #ffdada;
    padding-left: 18px;
    padding-right: 8px;

    height: 36px;
  }
}
.f-chart {
  overflow: hidden;
  flex: 1;
  height: calc(100% - 200px);
}
.bottomBar {
  padding: 20px 32px;
  display: flex;
  .bottom-submit-btn {
    padding: 0 150px;
    height: 80px;
    font-size: 32px;
  }
  .bottom-right {
    flex: 1;
    .nav-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding-left: 80px;
      .nav-item {
        text-align: center;
        color: #666;
        flex: 1 0 0;
        .nav-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .nav-text {
          font-size: 24px;
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
