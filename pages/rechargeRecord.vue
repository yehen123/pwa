<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
      <div class="ui-content-fix">
        <div class="topBar">
          <svg
            class="back-btn"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="router.back()"
          >
            <path
              d="M7.37853 0.280152C7.73549 -0.0793356 8.31439 -0.0948204 8.69031 0.245059C9.06621 0.584932 9.10512 1.159 8.77847 1.54588L8.72354 1.6061L2.28644 8.05187L8.71786 14.3908C9.06662 14.7346 9.09295 15.2863 8.77847 15.6613L8.72354 15.722C8.37741 16.0683 7.82216 16.0943 7.44483 15.7817L7.38375 15.7271L0.279833 8.72567C-0.0687862 8.38178 -0.0949172 7.83014 0.21969 7.45525L0.274622 7.39455L7.37853 0.280152Z"
              fill="black"
            />
            <rect x="2" y="7" width="18" height="2" rx="1" fill="black" />
          </svg>
          <div class="topBar-title">充值记录</div>
        </div>
        <div class="total">
          累计充值成功：
          <span class="text-black">{{ $utils.format.toCurrency(userStore.userInfo.moneyAdd) }}</span>
        </div>

        <div class="t-header">
          <div>充值时间/类型</div>
          <div>金额</div>
          <div class="text-right">状态</div>
        </div>
      </div>
      <div class="ui-content-auto">
        <ClientOnly>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-if="list.length"
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              class="record-list"
              @load="onLoad"
            >
              <div v-for="(item, index) in list" :key="index" class="record-item">
                <div class="flex-1">
                  <div class="record-time">{{ item.createTime }}</div>
                  <div class="record-type">{{ $utils.common.getTypeName(item.type, rechargeTypeDic) }}</div>
                </div>
                <div class="record-price raise">+{{ $utils.format.toCurrency(item.price) }}</div>
                <div
                  class="record-status"
                  :class="{ success: item.status === '1' || item.status === '3', fail: item.status === '2' }"
                >
                  {{ $utils.common.getTypeName(item.status, rechargeStatusDic) }}
                </div>
              </div>
            </van-list>
            <van-empty v-else-if="!loading" description="暂无数据" />
          </van-pull-refresh>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const list = ref<any[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
let pageNum = 1
const pageSize = 10
const userStore = useUserStore()
const rechargeTypeDic = [
  {
    label: 'CBpay充值',
    value: '0',
  },
  {
    label: 'USDT充值',
    value: '1',
  },
  {
    label: '其他充值',
    value: '2',
  },
]
const rechargeStatusDic = [
  {
    label: '处理中',
    value: '0',
  },
  {
    label: '充值失败',
    value: '1',
  },
  {
    label: '充值成功',
    value: '2',
  },
  {
    label: '充值成功',
    value: '3',
  },
]
const onLoad = async () => {
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }
  loading.value = true
  try {
    const res = (await $request.get(
      `/prod-api/home/recharge/list?pageNum=${pageNum}&pageSize=${pageSize}&isAsc=desc&orderByColumn=createTime`
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
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}
onMounted(() => {
  onLoad()
})
</script>

<style lang="less" scoped>
.topBar {
  position: relative;

  gap: 12px;
  padding-top: 32px;
  .back-btn {
    position: absolute;
    left: 32px;
    top: 32px;
    bottom: 0;
    margin: auto;
    width: 40px;
    height: 32px;
  }
  .topBar-title {
    font-size: 36px;
    color: #000000cc;
    width: 100%;
    text-align: center;
    font-weight: 600;
  }
}
.total {
  margin: 32px 32px 0;
  font-size: 28px;
  color: #333;
}
.t-header {
  border-bottom: 1px solid #ededed;
  display: grid;
  grid-template-columns: 55% 20% 25%;
  color: #666;
  // align-self: center;
  line-height: 60px;
  margin: 0 32px;
  padding-top: 24px;
  font-size: 24px;
}
.record-list {
  .record-item {
    border-bottom: 2px solid #0000001f;
    font-size: 24px;
    margin: 0 32px;
    padding: 24px 0;
    display: grid;
    align-items: center;
    grid-template-columns: 55% 20% 25%;
    .record-time {
      color: #333;
    }
    .record-price {
      width: 200px;
      font-size: 24px;
    }
    .record-status {
      color: #666;
      text-align: right;
    }
    .record-type {
      color: #999;
    }
    .success {
      color: #1caa3d;
    }
  }
}
</style>
