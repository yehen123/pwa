<template>
  <div class="mana-trade">
    <div class="pt-7 px-8 pb-8">
      <AssetCard type="finance"></AssetCard>
    </div>
    <div class="t-tab">
      <div class="t-tab-item" :class="{ active: current === 0 }" @click="current = 0">当前持仓</div>
      <div class="t-tab-item" :class="{ active: current === 1 }" @click="current = 1">历史持仓</div>
      <div class="t-tab-item" :class="{ active: current === 2 }" @click="current = 2">收益明细</div>
    </div>
    <div class="trade-list">
      <ManaTradeList v-if="current === 0" />
      <ManaHistoryList v-if="current === 1" />
      <ManaTradeLog v-if="current === 2" />
    </div>
  </div>
</template>
<script setup lang="ts">
import AssetCard from '@/components/scopes/AssetCard.vue'
import ManaTradeList from '@/components/scopes/ManaTradeList.vue'
import ManaHistoryList from '@/components/scopes/ManaHistoryList.vue'
import ManaTradeLog from '@/components/scopes/ManaTradeLog.vue'

const current = ref(0)
</script>
<style lang="less" scoped>
.trade-list {
  height: calc(100% - 60px - 480px);
}
.mana-trade {
  height: 100%;
  .t-tab {
    display: flex;
    border-bottom: 2px solid #0000001f;
    justify-content: space-between;
    margin: 0 20px;
    height: 60px;
    .t-tab-item {
      line-height: 60px;
      font-size: 28px;
      color: #666;
      &.active {
        color: #000;
        font-weight: bold;
      }
    }
  }
}
</style>
