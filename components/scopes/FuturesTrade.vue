<template>
  <div class="futures-trade">
    <div class="pt-7 px-8 pb-8">
      <AssetCard type="futures"></AssetCard>
    </div>
    <div class="t-header">
      <div>品种/代码/状态</div>
      <div>买入价x数量/卖出价</div>
      <div class="text-right">保证金/盈亏/杠杆</div>
    </div>
    <div class="t-body">
      <ClientOnly>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-if="list.length"
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in list"
              :key="index"
              class="t-row"
              @click="navigateTo(`/market/futuresDetail?id=${item.expId}`)"
            >
              <div>
                <div class="text-sm text-main">
                  {{ item.expName }}
                </div>
                <div class="text-xs text-sub">{{ item.expCode.split('_')[0] }}</div>
                <van-tag :color="Number(item.sellType) === 0 ? '#e63a3c' : '#09b971'">
                  {{ $utils.common.getTypeName(item.sellType, sellTypeDic) }}
                </van-tag>
                <div class="text-xs text-sub">
                  {{ $utils.common.getTypeName(item.status, statusDic) }}
                </div>
              </div>
              <div>
                <div class="text-xs text-sub">{{ item.expStartTime }}</div>
                <div>{{ item.startPrice }} {{ item.startPrice === null ? '' : 'x' }} {{ item.num }}</div>
                <div class="text-xs text-sub mt-2">{{ item.expEndTime }}</div>
                <div>{{ item.endPrice }}</div>
              </div>
              <div class="text-right" :class="{ raise: item.moneyValue > 0, fall: item.moneyValue < 0 }">
                <div class="text-base text-main">{{ item.money }}</div>
                <div class="text-xs">{{ item.moneyValue < 0 ? '-' : '+' }}￥{{ Math.abs(item.moneyValue) }}</div>
                <div class="text-xs">
                  {{ item.moneyValue < 0 ? '-' : '+' }} {{ Math.abs(NP.times(item.moneyRate || 0, 100)).toFixed(2) }}%
                  ({{ Math.abs(item.leverRate) }}倍)
                </div>
                <div class="text-xs text-sub">{{ item.fee === null ? '' : '佣金:-' }}{{ item.fee }}</div>
              </div>
            </div>
          </van-list>
          <van-empty v-else-if="!loading" description="暂无数据" />
        </van-pull-refresh>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import AssetCard from '@/components/scopes/AssetCard.vue'
import NP from 'number-precision'

const list = ref<any[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
let pageNum = 1
const pageSize = 10

const statusDic = [
  { label: '已下单', value: 0 },
  { label: '结算中', value: 1 },
  { label: '已结算', value: 2 },
  { label: '已买入', value: 3 },
  { label: '作废', value: 4 },
]

const sellTypeDic = [
  { label: '买多', value: 0 },
  { label: '卖空', value: 1 },
]

const onLoad = async () => {
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }
  loading.value = true
  try {
    const res = (await $request.get(
      `/prod-api/home/sell/list?pageNum=${pageNum}&pageSize=${pageSize}&isAsc=desc&orderByColumn=expEndTime`
    )) as any
    list.value = list.value.concat(res.data)
    pageNum++
    if (list.value.length >= res.total) {
      finished.value = true
    }
  } catch (e) {}
  loading.value = false
}

const onRefresh = () => {
  pageNum = 1
  finished.value = false
  loading.value = true
  onLoad()
}

onMounted(() => {
  onLoad()
})
</script>

<style lang="less" scoped>
.t-header {
  height: 60px;
  border-bottom: 1px solid #ededed;
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  color: #666;
  line-height: 60px;
  margin: 0 20px;
  font-size: 22px;
}
.futures-trade {
  height: 100%;
}
.t-body {
  height: calc(100% - 60px - 480px);
  overflow: auto;
}
.t-row {
  display: grid;

  padding-top: 20px;
  padding-bottom: 20px;
  margin: 0 20px;
  grid-template-columns: repeat(3, 33.33%);
  border-bottom: 1px solid #0000001f;
  align-items: center;
}

:deep(.van-list__finished-text) {
  padding-bottom: 30px;
}

.text-main {
  color: #000;
}

.text-sub {
  color: #666;
}

.raise {
  color: #e63a3c;
}

.fall {
  color: #09b971;
}
</style>
