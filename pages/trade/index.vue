<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
      <div class="ui-content-fix">
        <div class="topbar">
          <div class="toptab2">
            <div class="toptab-item" :class="{ active: current === 0 }" @click="router.replace('/trade?type=0')">
              期货
            </div>
            <div class="toptab-item" :class="{ active: current === 1 }" @click="router.replace('/trade?type=1')">
              理财
            </div>
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
      </div>

      <div class="ui-content-auto">
        <FuturesTrade v-if="current === 0" />
        <ManaTrade v-if="current === 1" />
      </div>

      <div class="ui-content-fix">
        <Tabbar></Tabbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Tabbar from '@/components/scopes/Tabbar.vue'
import FuturesTrade from '@/components/scopes/FuturesTrade.vue'
import ManaTrade from '@/components/scopes/ManaTrade.vue'

useHead({
  title: '交易',
})

const router = useRouter()
const current = computed(() => {
  return Number(router.currentRoute.value.query.type || 0)
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
</style>
