<template>
  <div class="t-container">
    <div class="t-header">
      <div>名称</div>
      <div>结算时间</div>
      <div class="text-right">盈利/手续费</div>
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
                  {{ item.manaName }}
                </div>
              </div>
              <div>
                <div class="text-xs text-sub">{{ item.kTime }}</div>
              </div>
              <div class="text-right">
                <div class="text-base raise">{{ item.money }}</div>
                <div class="text-xs text-sub">{{ item.fee === null ? '' : '手续费:-' }}{{ item.fee }}</div>
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
const list = ref<any[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
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
      `/prod-api/home/userlog/list?pageNum=${pageNum}&orderByColumn=createTime&isAsc=desc&pageSize=${pageSize}`
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
  grid-template-columns: 50% 25% 25%;

  color: #666;
  line-height: 60px;
  margin: 0 20px;
  font-size: 22px;
}
.t-container {
  height: 100%;
}
.t-body {
  height: calc(100% - 60px);
  overflow: auto;
}
.t-row {
  display: grid;
  padding-top: 20px;
  padding-bottom: 20px;
  grid-template-columns: 50% 25% 25%;
  margin: 0 20px;

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
