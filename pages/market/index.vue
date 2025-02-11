<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
      <div class="ui-content-fix">
        <div class="topbar">
          <div class="toptab2">
            <div class="toptab-item" :class="{ active: current === 0 }" @click="current = 0">期货</div>
            <div class="toptab-item" :class="{ active: current === 1 }" @click="current = 1">自选</div>
          </div>
          <div class="action">
            <a @click="navigateTo('/market/search')">
              <van-icon name="search" />
            </a>
            <a href="https://ycjuohjn.kjovjjbeolyablg.xyz/index?key=6006c3c65d49247ec24cd2e4ee81824b">
              <van-icon name="service-o" />
            </a>
          </div>
        </div>
        <div v-show="current === 0" class="topbar-sub">
          <van-tabs v-model:active="currentSub">
            <van-tab v-for="(item, index) in subTab" :key="index" :title="item.label"></van-tab>
          </van-tabs>
        </div>
        <div class="flist-header">
          <div>名称/代码</div>
          <div class="text-center">最新/涨跌幅</div>
          <div class="text-right">成交量/交易额</div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div v-if="current === 0" class="flist-content futures-list">
          <div v-for="(item, index) in futuresList" :key="index" class="flist-item" @click="navigateToFutures(item)">
            <div>
              <div class="flist-name">{{ item.name }}</div>
              <div class="flist-code">
                {{ item.code.split('_')[0] }}
                <van-tag v-if="getTradeState(item.tradePeriods) === 2" color="#B097F8" size="mini" plain class="ml-2">
                  交易中
                </van-tag>
              </div>
            </div>
            <div class="text-center">
              <div class="flist-price">{{ item.price }}</div>
              <div class="flist-change" :class="item.changeRate >= 0 ? 'raise' : 'fall'">
                <span class="mr-1">
                  {{
                    item.changeRate === null
                      ? ''
                      : item.changeRate >= 0
                        ? `+${item.changeRate}%`
                        : `${item.changeRate}%`
                  }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <div>{{ item.vol }}</div>
              <div>{{ item.amount }}</div>
            </div>
          </div>
        </div>
        <div v-if="current === 1" class="flist-content my-list">
          <div v-for="(item, index) in myList" :key="index" class="flist-item" @click="navigateToFutures(item)">
            <div>
              <div class="flist-name">{{ item.name }}</div>
              <div class="flist-code">{{ item.code.split('_')[0] }}</div>
            </div>
            <div class="text-center">
              <div class="flist-price">{{ item.price }}</div>
              <div class="flist-change" :class="item.changeRate >= 0 ? 'raise' : 'fall'">
                <span class="mr-1">
                  {{
                    item.changeRate === null
                      ? ''
                      : item.changeRate >= 0
                        ? `+${item.changeRate}%`
                        : `${item.changeRate}%`
                  }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <div>{{ item.vol }}</div>
              <div>{{ item.amount }}</div>
            </div>
          </div>
          <van-empty v-if="myList.length === 0" description="暂无数据"></van-empty>
          <div class="my-list-opts">
            <div class="my-list-add" @click="navigateTo('/market/search')">
              <svg xmlns="http://www.w3.org/2000/svg" class="opt-icon" viewBox="0 0 12 12" fill="none">
                <g clip-path="url(#clip0_297_2037)">
                  <path
                    d="M6.5824 5.54863H11.5445C11.6703 5.56458 11.786 5.62588 11.8699 5.72104C11.9537 5.81619 12 5.93867 12 6.06551C12 6.19235 11.9537 6.31483 11.8699 6.40999C11.786 6.50515 11.6703 6.56645 11.5445 6.5824H6.5824V11.5445C6.56645 11.6703 6.50515 11.786 6.40999 11.8699C6.31483 11.9537 6.19235 12 6.06551 12C5.93867 12 5.81619 11.9537 5.72104 11.8699C5.62588 11.786 5.56458 11.6703 5.54863 11.5445V6.5824H0.586532C0.513166 6.5917 0.438662 6.58527 0.367971 6.56355C0.297281 6.54182 0.232026 6.5053 0.176543 6.45641C0.12106 6.40751 0.076622 6.34736 0.0461826 6.27997C0.0157431 6.21257 0 6.13946 0 6.06551C0 5.99156 0.0157431 5.91845 0.0461826 5.85106C0.076622 5.78366 0.12106 5.72351 0.176543 5.67462C0.232026 5.62572 0.297281 5.5892 0.367971 5.56748C0.438662 5.54575 0.513166 5.53933 0.586532 5.54863H5.54863V0.586532C5.53933 0.513166 5.54575 0.438662 5.56748 0.367971C5.5892 0.297281 5.62572 0.232026 5.67462 0.176543C5.72351 0.12106 5.78366 0.076622 5.85106 0.0461826C5.91845 0.0157431 5.99156 0 6.06551 0C6.13946 0 6.21257 0.0157431 6.27997 0.0461826C6.34736 0.076622 6.40751 0.12106 6.45641 0.176543C6.5053 0.232026 6.54182 0.297281 6.56355 0.367971C6.58527 0.438662 6.5917 0.513166 6.5824 0.586532V5.54863Z"
                    fill="#666666"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_297_2037">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              添加自选
            </div>
            <div v-if="myList.length > 0" class="my-list-edit" @click="handleEditMyList">
              <svg xmlns="http://www.w3.org/2000/svg" class="opt-icon" viewBox="0 0 12 12" fill="none">
                <path
                  d="M11.5445 5.54857H6.5824H5.54863H0.586532C0.513166 5.53927 0.438662 5.5457 0.367971 5.56742C0.297281 5.58914 0.232026 5.62567 0.176543 5.67456C0.12106 5.72345 0.076622 5.7836 0.0461826 5.851C0.0157431 5.9184 0 5.9915 0 6.06545C0 6.13941 0.0157431 6.21251 0.0461826 6.27991C0.076622 6.34731 0.12106 6.40745 0.176543 6.45635C0.232026 6.50524 0.297281 6.54176 0.367971 6.56349C0.438662 6.58521 0.513166 6.59164 0.586532 6.58234H5.54863H6.5824H11.5445C11.6703 6.56639 11.786 6.50509 11.8699 6.40993C11.9537 6.31477 12 6.19229 12 6.06545C12 5.93862 11.9537 5.81614 11.8699 5.72098C11.786 5.62582 11.6703 5.56452 11.5445 5.54857Z"
                  fill="#666666"
                />
                <path
                  d="M11.5445 1.00414H6.5824H5.54863H0.586532C0.513166 0.994837 0.438662 1.00126 0.367971 1.02299C0.297281 1.04471 0.232026 1.08123 0.176543 1.13013C0.12106 1.17902 0.076622 1.23917 0.0461826 1.30656C0.0157431 1.37396 0 1.44707 0 1.52102C0 1.59497 0.0157431 1.66808 0.0461826 1.73548C0.076622 1.80287 0.12106 1.86302 0.176543 1.91191C0.232026 1.96081 0.297281 1.99733 0.367971 2.01905C0.438662 2.04078 0.513166 2.0472 0.586532 2.0379H5.54863H6.5824H11.5445C11.6703 2.02196 11.786 1.96066 11.8699 1.8655C11.9537 1.77034 12 1.64786 12 1.52102C12 1.39418 11.9537 1.2717 11.8699 1.17654C11.786 1.08138 11.6703 1.02008 11.5445 1.00414Z"
                  fill="#666666"
                />
                <path
                  d="M11.5445 10.0041H6.5824H5.54863H0.586532C0.513166 9.99484 0.438662 10.0013 0.367971 10.023C0.297281 10.0447 0.232026 10.0812 0.176543 10.1301C0.12106 10.179 0.076622 10.2392 0.0461826 10.3066C0.0157431 10.374 0 10.4471 0 10.521C0 10.595 0.0157431 10.6681 0.0461826 10.7355C0.076622 10.8029 0.12106 10.863 0.176543 10.9119C0.232026 10.9608 0.297281 10.9973 0.367971 11.0191C0.438662 11.0408 0.513166 11.0472 0.586532 11.0379H5.54863H6.5824H11.5445C11.6703 11.022 11.786 10.9607 11.8699 10.8655C11.9537 10.7703 12 10.6479 12 10.521C12 10.3942 11.9537 10.2717 11.8699 10.1765C11.786 10.0814 11.6703 10.0201 11.5445 10.0041Z"
                  fill="#666666"
                />
              </svg>
              <div>编辑自选</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-content-fix">
        <Tabbar></Tabbar>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Tabbar from '@/components/scopes/Tabbar.vue'
import { getFuturesList, getMyList, getFuturesTypeList, getTradeState } from '@/service/futures'

useHead({
  title: '行情',
})
defineOptions({
  name: 'Market',
})
const { tempKeep } = useKaCtrl()
const router = useRouter()
const current = ref(0)
const currentSub = ref(0)
const subTab = ref<OptionList>([])
const futuresList = ref<Futures.FuturesData[]>([])
const myList = ref<Futures.FuturesData[]>([])
const currentSubValue = computed(() => {
  return subTab.value[currentSub.value]?.value
})
const loadSubTab = async () => {
  const res = await getFuturesTypeList()
  subTab.value = res
}
let stopFlag
let timeout
let timeout2
const loadFuturesList = async () => {
  if (stopFlag) {
    return
  }
  const res = await getFuturesList(currentSubValue.value)
  futuresList.value = res
  document.querySelectorAll('.futures-list .flist-item').forEach((el) => {
    el.classList.add('change-effect')
    el.addEventListener(
      'transitionend',
      () => {
        el.classList.remove('change-effect')
      },
      {
        once: true,
      }
    )
  })
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    loadFuturesList()
  }, 60000)
}
const loadMyList = async () => {
  if (stopFlag) {
    return
  }
  const res = await getMyList()
  myList.value = res
  clearTimeout(timeout2)
  timeout2 = setTimeout(() => {
    loadMyList()
  }, 60000)
}
const navigateToFutures = (item) => {
  router.push({
    path: '/market/futuresDetail',
    query: {
      id: item.id,
    },
  })
}
watch(currentSubValue, (v) => {
  if (v) {
    loadFuturesList()
  }
})
watch(current, (v) => {
  if (v === 1) {
    loadMyList()
  }
})
const handleEditMyList = () => {
  tempKeep('Market')
  navigateTo('/market/editMyList')
}
onActivated(() => {
  loadMyList()
})
onMounted(async () => {
  stopFlag = false
  await loadSubTab()
})
onUnmounted(() => {
  stopFlag = true
})
</script>
<style lang="less" scoped>
.topbar {
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px 0;

  .logo {
    width: 62px;
    height: 62px;
  }
  .toptab2 {
    display: flex;
    background: #f7f7f7;
    border-radius: 32px;
    padding: 2px 12px;
    height: 64px;
    .toptab-item {
      flex: 1;
      height: 56px;
      color: var(--th-text-secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      position: relative;
      height: 60px;
      padding: 0 28px;

      &.active {
        background: #fff;
        color: var(--primary-color);
        border-radius: 30px;
      }
    }
  }
  .action {
    font-size: 44px;
    color: var(--th-text-secondary-color);
    display: flex;
    gap: 20px;
  }
}
.topbar-sub {
  --van-tabs-line-height: 60px;
  --van-tabs-bottom-bar-width: 0.3rem;
  --van-tab-active-text-color: #000;
  --van-tabs-bottom-bar-color: #fff;
  --van-tab-text-color: #666;
  --van-tab-font-size: 32px;
  --van-tabs-nav-background: var(--th-content-bg);
  margin: 28px 32px 0;
  :deep(.van-tabs__nav) {
    padding-left: 0 !important;
    padding-right: 0 !important;
    .van-tab--grow:first-child {
      padding-left: 0 !important;
    }
  }
  border-bottom: 1px solid #0000001f;
}
.flist-header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: relative;
  color: #666;
  font-size: 26px;
  height: 68px;
  align-items: center;
  padding: 0 32px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 32px;
    right: 32px;
    background: #0000001f;
  }
}
.flist-content {
  background: var(--th-list-bg);
  .flist-item {
    transition: background-color 0.5s ease-out;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    position: relative;
    color: #000;
    font-size: 24px;
    align-items: center;
    margin: 0 32px;
    border-bottom: 1px solid #0000001f;
    height: 120px;
    .flist-name {
      font-size: 28px;
    }
    .flist-change {
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .flist-price {
      font-size: 32px;
    }
    .flist-code {
      color: #6b7280;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 1px;
      left: 40px;
      right: 0;
      background: var(--th-list-border-color);
    }
  }
  margin-bottom: 50px;
}
.change-effect {
  background-color: #f8f8f8;
}
.my-list-opts {
  display: flex;
  color: #666;
  font-size: 28px;
  .opt-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    margin-top: -2px;
  }
  .my-list-add,
  .my-list-edit {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    position: relative;
  }
  .my-list-edit {
    &::after {
      content: '';
      position: absolute;
      left: 0%;
      top: 20px;
      width: 2px;
      height: 24px;
      background: #0000001f;
    }
  }
}
</style>
