<template>
  <div class="tabbar">
    <a class="tabbar-item" :class="{ active: route.path === '/' }" @click="route.path === '/' || navigateTab('/')">
      <div class="tabbar-icon"></div>
      <div class="tabbar-text">首页</div>
    </a>
    <a
      class="tabbar-item"
      :class="{ active: route.path === '/market' }"
      @click="route.path === '/market' || navigateTab('/market')"
    >
      <div class="tabbar-icon"></div>
      <div class="tabbar-text">行情</div>
    </a>
    <a
      class="tabbar-item"
      :class="{ active: route.path === '/trade' }"
      @click="route.path === '/trade' || navigateTab('/trade')"
    >
      <div class="tabbar-icon"></div>
      <div class="tabbar-text"></div>
    </a>
    <a
      class="tabbar-item"
      :class="{ active: route.path === '/financing' }"
      @click="route.path === '/financing' || navigateTab('/financing')"
    >
      <div class="tabbar-icon"></div>
      <div class="tabbar-text">理财</div>
    </a>
    <a
      class="tabbar-item"
      :class="{ active: route.path === '/mine' }"
      @click="route.path === '/mine' || navigateTab('/mine')"
    >
      <div class="tabbar-icon"></div>
      <div class="tabbar-text">资产</div>
    </a>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const navigateTab = (path) => {
  router.push(path)
}
</script>
<style lang="less" scoped>
.tabbar {
  height: 102px;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  .tabbar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .tabbar-icon {
      width: 48px;
      height: 48px;
    }
    &:nth-child(1) {
      .tabbar-icon {
        background: url('/img/nav-icon-home.png') no-repeat center center / 100% 100%;
      }
      &.active {
        .tabbar-icon {
          background: url('/img/nav-icon-home-active.png') no-repeat center center / 100% 100%;
        }
      }
    }
    &:nth-child(2) {
      .tabbar-icon {
        background: url('/img/nav-icon-market.png') no-repeat center center / 100% 100%;
      }
      &.active {
        .tabbar-icon {
          background: url('/img/nav-icon-market-active.png') no-repeat center center / 100% 100%;
        }
      }
    }
    &:nth-child(3) {
      .tabbar-icon {
        background: url('/img/nav-icon-trade.png') no-repeat center center / 100% 100%;
        width: 104px;
        height: 104px;
        position: relative;
        top: -44px;
      }
    }
    &:nth-child(4) {
      .tabbar-icon {
        background: url('/img/nav-icon-financing.png') no-repeat center center / 100% 100%;
      }
      &.active {
        .tabbar-icon {
          background: url('/img/nav-icon-financing-active.png') no-repeat center center / 100% 100%;
        }
      }
    }
    &:nth-child(5) {
      .tabbar-icon {
        background: url('/img/nav-icon-mine.png') no-repeat center center / 100% 100%;
      }
      &.active {
        .tabbar-icon {
          background: url('/img/nav-icon-mine-active.png') no-repeat center center / 100% 100%;
        }
      }
    }
    .tabbar-text {
      font-size: 24px;
      &:extend(.font-gradient);
    }
    :deep(.van-icon) {
      font-size: 40px;
    }
    &.active {
      color: var(--primary-color);
    }
  }
}
</style>
