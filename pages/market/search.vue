<template>
  <div class="ui-page">
    <ClientOnly>
      <div class="ui-content ui-content-auto-scroll">
        <div class="ui-content-fix">
          <div class="topbar">
            <div class="topbar-left">
              <van-icon name="arrow-left" @click="router.back()" />
            </div>
            <div class="topbar-right">
              <van-search v-model="searchValue" placeholder="请输入搜索内容" autofocus @search="handleSearch" />
            </div>
          </div>
        </div>
        <div class="ui-content-auto">
          <div v-if="searchHistory.length > 0" class="search-history">
            <div class="search-history-title">
              <span>搜索历史</span>
              <div class="search-history-remove" @click="handleRemoveHistory">
                <van-icon name="delete-o" />
              </div>
            </div>
            <div class="search-history-list">
              <div
                v-for="item in searchHistory"
                :key="item"
                class="search-history-item"
                @click="handleSearchHistory(item)"
              >
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
          <div v-if="showSearchResult" class="search-result">
            <div v-if="searchResult.length > 0" class="search-result-list">
              <div
                v-for="(item, index) in searchResult"
                :key="index"
                class="search-result-item"
                @click="navigateTo(`/market/futuresDetail?id=${item.id}`)"
              >
                <div class="search-result-item-left">
                  <div class="title">
                    {{ item.name }}
                    <van-tag
                      v-if="getTradeState(item.tradePeriods) === 2"
                      color="#B097F8"
                      size="mini"
                      plain
                      class="ml-2"
                    >
                      交易中
                    </van-tag>
                  </div>
                  <div class="sub">{{ item.code }}|中高风险|期货</div>
                </div>
                <div class="search-result-item-right">
                  <div class="change-rate">
                    <div class="change-rate-value" :class="item.changeRate >= 0 ? 'raise' : 'fall'">
                      {{
                        item.changeRate === null
                          ? ''
                          : item.changeRate >= 0
                            ? `+${item.changeRate}%`
                            : `${item.changeRate}%`
                      }}
                    </div>
                    <div class="change-rate-sub">最近更新涨幅</div>
                  </div>
                  <div class="f-add" @click.stop="handleAddMyList(item)">
                    <van-icon v-if="!isInMyList(item.id)" name="plus" />
                    <van-icon v-else name="minus" />
                  </div>
                </div>
              </div>
            </div>
            <van-empty v-else-if="!loading" description="暂无数据" />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
import { getFuturesSearchList } from '@/service/futures'
import { getTradeState } from '@/service/futures'
const router = useRouter()
const searchValue = ref('')
const searchHistory = ref<string[]>([])
const searchResult = ref<Futures.FuturesData[]>([])
const loading = ref(false)
const showSearchResult = ref(false)
const handleSearchHistory = (item: string) => {
  searchValue.value = item
  handleSearch()
}
const handleSearch = async () => {
  if (searchValue.value) {
    searchHistory.value = searchHistory.value.filter((item) => item !== searchValue.value)
    searchHistory.value.unshift(searchValue.value)
    localStorage.setItem('searchHistory', searchHistory.value.join(','))
  }
  loading.value = true
  try {
    const res = await getFuturesSearchList(searchValue.value)
    searchResult.value = res
  } catch (error) {}
  showSearchResult.value = true
  loading.value = false
}

const handleRemoveHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('searchHistory')
}
const userStore = useUserStore()
const isInMyList = (id) => {
  return userStore.userInfo.choose?.split(',').includes(String(id))
}
onMounted(() => {
  searchHistory.value = localStorage.getItem('searchHistory')?.split(',') || []
})

const handleAddMyList = async (futures) => {
  let list: string[] = userStore.userInfo.choose?.split(',') || []
  const inFlag = isInMyList(futures.id)
  if (inFlag) {
    list = list.filter((item) => item !== String(futures.id))
  } else {
    list.unshift(String(futures.id))
  }
  await $request.post('/prod-api/home/user/upOpt', { opt: list.join(',') })
  await userStore.updateUserInfo()
  $message.success(inFlag ? '移除自选成功' : '添加自选成功')
}
</script>
<style lang="less" scoped>
.topbar {
  display: flex;
  align-items: center;
  padding-top: 24px;
  padding-left: 24px;
  .topbar-left {
    :deep(.van-icon) {
      display: block;
      font-size: 40px;
      font-weight: bold;
    }
  }
  .topbar-right {
    flex: 1;
  }
}
.f-add {
  color: #fd9a16;

  :deep(.van-icon) {
    border: 2px solid #fd9a16;
    padding: 2px;
    font-size: 24px;
    display: block;
    margin-top: -2px;
  }
}

.search-history {
  padding: 16px 32px 0;
  .search-history-title {
    font-size: 28px;
    color: #000;
    font-weight: bold;
    position: relative;
  }
  .search-history-remove {
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .search-history-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding-top: 8px;
    .search-history-item {
      padding: 0px 24px;
      background-color: #f5f5f5;
    }
  }
}
.search-result {
  margin: 32px 32px 0;
  padding: 28px 28px 14px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  .search-result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    .search-result-item-left {
      .title {
        font-size: 36px;
        font-weight: bold;
      }
      .sub {
        font-size: 24px;
        color: #666;
      }
    }
  }
  .search-result-item-right {
    display: flex;
    align-items: center;
    gap: 60px;
    .change-rate {
      .change-rate-value {
        font-size: 36px;
        text-align: right;
        font-weight: bold;
      }
      .change-rate-sub {
        font-size: 24px;
        color: #666;
      }
    }
  }
}
</style>
