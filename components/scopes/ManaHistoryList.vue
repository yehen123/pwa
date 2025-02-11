<template>
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
          <div v-for="(item, index) in list" :key="index" class="t-row">
            <div class="t-row-title">
              <div>
                {{ item.manaName }}
              </div>
              <div class="t-row-title-right">
                <van-button
                  v-if="item.status === '0'"
                  color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
                  round
                  size="small"
                  class="buyback-btn"
                  @click="handleBuyback(item)"
                >
                  赎回
                </van-button>
                <span v-else-if="item.status === '1'">已赎回</span>
                <span v-else-if="item.status === '2'">作废</span>
              </div>
            </div>
            <div class="t-row-content">
              <div>
                <div class="text-lg raise">{{ item.moneyMake }}</div>
                <div class="text-xs text-sub">盈利</div>
              </div>
              <div class="text-center">
                <div class="text-base text-sub pt-2">{{ item.money }}</div>
                <div class="text-xs text-sub mt-1">本金</div>
              </div>
              <div class="text-right">
                <div class="text-base text-main pt-2">{{ item.moneyTotal }}</div>
                <div class="text-xs text-sub mt-1">总金额</div>
              </div>
            </div>
            <div class="t-row-bottom">
              <van-tag color="#FD9A16" plain>
                {{ item.cal === '0' ? '永续合约' : '到期赎回' }}
              </van-tag>
            </div>
          </div>
        </van-list>
        <van-empty v-else-if="!loading" description="暂无数据" />
      </van-pull-refresh>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const list = ref<any[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const userStore = useUserStore()
let pageNum = 1
const pageSize = 10

const onLoad = async () => {
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }
  loading.value = true
  try {
    const res = (await $request.get(
      `/prod-api/home/buy/list?pageNum=${pageNum}&pageSize=${pageSize}&isAsc=desc&orderByColumn=createTime&status=1`
    )) as any
    list.value = list.value.concat(res.data)
    pageNum++
    if (list.value.length >= res.total) {
      finished.value = true
    }
  } catch (e) {}
  loading.value = false
}

const handleBuyback = async (item: any) => {
  await $confirm('赎回后将不再享受收益，确定要赎回吗？', '赎回确认')
  try {
    await $request.post(`/prod-api/home/buy/back`, { id: item.id })
    $message.success('赎回成功')
    list.value = []
    await userStore.updateUserInfo()
    onRefresh()
  } catch (e) {}
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
.t-body {
  height: 100%;
  overflow: auto;
}
.t-row {
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  margin: 20px;
  display: grid;
  padding: 28px;
  border-bottom: 1px solid #0000001f;
  align-items: center;
  .t-row-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
    .t-row-title-right {
      font-size: 24px;
      color: #666;
    }
    .buyback-btn {
      width: 120px;
      height: 60px;
    }
  }
  .t-row-content {
    display: grid;
    grid-template-columns: 33% 40% 27%;
    justify-content: space-between;
  }
  .t-row-bottom {
    padding-top: 8px;
  }
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
