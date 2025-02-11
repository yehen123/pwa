<template>
  <div class="asset-card">
    <div class="asset-card-header">
      <div class="asset-card-account">
        <span class="asset-card-account-type">普通</span>
        <span class="asset-card-account-id">余额</span>
        <van-icon name="eye-o" />
      </div>
      <div v-if="userStore.userInfo.subLastDate && props.type === 'total'" class="asset-card-profit">
        <div class="asset-card-profit-date">{{ $dayjs(userStore.userInfo.subLastDate).format('MM-DD') }} 提现</div>
        <div class="asset-card-profit-amount">{{ $utils.format.toCurrency(userStore.userInfo.subLastMoney) }}</div>
      </div>
    </div>
    <div class="asset-card-total">{{ userStore.userInfo.money }}</div>
    <div class="asset-card-grid">
      <template v-if="props.type === 'total'">
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">持仓总金额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.moneyLock }}</div>
        </div>
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">理财总金额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.manaTotal }}</div>
        </div>
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">可用余额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.canMoney }}</div>
        </div>
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">可提余额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.moneyBottom }}</div>
        </div>
      </template>
      <template v-else-if="props.type === 'futures'">
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">持仓总金额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.moneyLock }}</div>
        </div>
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">累计盈利额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.moneyMake }}</div>
        </div>
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">可用余额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.canMoney }}</div>
        </div>
      </template>
      <template v-else-if="props.type === 'finance'">
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">理财总金额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.manaTotal }}</div>
        </div>
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">累计盈利额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.manaMake }}</div>
        </div>
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">可用余额</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.canMoney }}</div>
        </div>
        <div class="asset-card-grid-item">
          <div class="asset-card-grid-item-label">理财本金</div>
          <div class="asset-card-grid-item-value">{{ userStore.userInfo.manaMoney }}</div>
        </div>
      </template>
    </div>
    <div class="asset-card-actions">
      <div class="asset-card-action" @click="navigateTo('/fundsDetail')">
        <van-icon name="balance-pay" />
        <span>资产明细</span>
      </div>
      <div class="asset-card-action" @click="navigateTo('/trade?type=0')">
        <van-icon name="bar-chart-o" />
        <span>期货交易</span>
      </div>
      <div class="asset-card-action" @click="navigateTo('/trade?type=1')">
        <van-icon name="clock-o" />
        <span>理财分析</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const props = defineProps<{
  type: 'futures' | 'finance' | 'total'
}>()
</script>

<style lang="less" scoped>
.asset-card {
  padding: 32px;
  background: url('/img/home-top-bg.jpg') no-repeat center center;
  background-size: auto 100%;
  border-radius: 24px;
  color: #fff;
  position: relative;
  height: 420px;
  .asset-card-header {
    margin-bottom: 8px;
  }

  .asset-card-account {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;

    .asset-card-account-type {
      padding: 2px 10px;
      border-radius: 20px;
      font-size: 16px;
      border: 1px solid #ddd;
    }

    .van-icon {
      font-size: 28px;
      // for center
      margin-top: 4px;
    }
  }

  .asset-card-profit {
    position: absolute;
    right: 0;
    top: 32px;
    border-radius: 50px 0px 0px 50px;
    background: rgba(0, 0, 0, 0.12);
    height: 88px;
    padding-left: 48px;
    padding-right: 28px;
    padding-top: 8px;
    .asset-card-profit-date {
      font-size: 20px;
      color: #ddd;
    }
    .asset-card-profit-amount {
      font-size: 28px;
      color: #fff;
    }
  }

  .asset-card-total {
    font-size: 48px;
    font-weight: bold;
    color: #eadbb4;
  }

  .asset-card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    padding-top: 16px;
  }

  .asset-card-grid-item {
    .asset-card-grid-item-label {
      font-size: 20px;
      color: #ddd;
    }

    .asset-card-grid-item-value {
      font-size: 28px;
      font-weight: 500;
    }
  }

  .asset-card-actions {
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
  }

  .asset-card-action {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 24px;

    .van-icon {
      font-size: 32px;
    }
  }
}
</style>
