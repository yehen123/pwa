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
          <div class="topBar-title">理财详情</div>
          <div class="topBar-right">
            <a href="https://ycjuohjn.kjovjjbeolyablg.xyz/index?key=6006c3c65d49247ec24cd2e4ee81824b">
              <van-icon name="service-o" />
            </a>
          </div>
        </div>
      </div>
      <div v-if="manaDetail" class="ui-content-auto">
        <div class="product-header">
          <div class="product-title">{{ manaDetail.name }}</div>
          <div class="product-tags">
            <span v-if="manaDetail.cal === '0'" class="tag">永续合约</span>
            <span v-else class="tag">到期赎回</span>
            <span class="tag">高额回报</span>
          </div>
        </div>

        <div class="product-desc">
          {{ manaDetail.info }}
        </div>

        <div class="notice-card">
          <div class="notice-title">专属投资顾问小顾提示</div>

          <div class="notice-content">
            <div class="notice-list">
              <div class="notice-item">日利率：{{ manaDetail.dayRate.toFixed(2) }}%</div>
              <div class="notice-item">月利率：{{ manaDetail.monthRate.toFixed(2) }}%</div>
              <div class="notice-item">年利率：{{ manaDetail.yearRate.toFixed(2) }}%</div>
            </div>
          </div>
        </div>
        <div class="rate-box">
          <div class="rate-info">
            <div class="rate-item">
              <div class="rate-label">七日年化率1-100</div>

              <div class="rate-value">{{ manaDetail.yearRate.toFixed(2) }}%</div>
            </div>
            <div class="rate-item">
              <div class="rate-label">日收益</div>

              <div class="rate-value">{{ manaDetail.dayRate.toFixed(2) }}%</div>
            </div>
          </div>
          <div class="trend-chart">
            <div class="trend-chart-day">{{ $dayjs().format('YYYY-MM-DD') }}</div>
            <div class="trend-chart-value">{{ manaDetail.dayRate.toFixed(2) }}%</div>
          </div>
        </div>
        <div class="trend-chart-title">
          <div class="trend-chart-symbol"></div>
          <div class="trend-chart-title-text">七日年化收益率</div>
        </div>
        <van-button
          v-if="canBuy"
          class="buy-btn"
          block
          color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
          round
          @click="handleSubmit"
        >
          立即买入
        </van-button>
        <van-button
          v-else
          class="buy-btn"
          block
          color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
          round
          @click="navigateTo('/trade?type=1')"
        >
          查看收益
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const manaDetail = ref<Mana.ManaData>()
const loadData = async () => {
  const id = router.currentRoute.value.query.id
  const res = await $request(`/prod-api/home/mana/${id}`)
  manaDetail.value = res.data
}
const canBuy = computed(() => {
  return manaDetail.value?.buyFlag !== true
})
const handleSubmit = () => {
  router.push(`/trade/doTrade/mana?id=${router.currentRoute.value.query.id}`)
}
onMounted(() => {
  loadData()
})
</script>

<style lang="less" scoped>
.topBar {
  position: relative;
  background: #fff;
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
  .topBar-right {
    position: absolute;
    top: 32px;
    right: 32px;
    margin-top: 6px;
    :deep(.van-icon) {
      font-size: 44px;
    }
  }
}

.product-header {
  padding: 32px;

  .product-logo {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-bottom: 16px;
  }

  .product-title {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .product-tags {
    .tag {
      display: inline-block;
      padding: 4px 12px;
      margin-right: 8px;
      border-radius: 4px;
      background: #e7efff;
      font-size: 20px;
      color: #6490f3;
    }
  }
}

.product-desc {
  padding: 0 32px;
  font-size: 28px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 32px;
}

.notice-card {
  margin: 80px 32px 0;
  padding: 24px;
  background: #f0f7ff;
  border-radius: 16px;
  position: relative;
  .notice-icon {
    margin-right: 16px;
    padding-top: 4px;
  }

  .notice-title {
    font-size: 24px;
    margin-bottom: 16px;
    background: url('/img/financing-notice.png') no-repeat;
    background-size: 100% 100%;
    padding-left: 80px;
    width: 374px;
    height: 68px;
    color: #fff;
    line-height: 68px;
    position: absolute;
    top: -50px;
    left: 0;
  }

  .notice-item {
    font-size: 24px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
.rate-box {
  margin: 32px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  .rate-info {
    display: flex;
    padding: 32px;
    justify-content: space-around;

    position: relative;
    .rate-item {
      text-align: center;

      .rate-value {
        font-size: 40px;
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 8px;
      }

      .rate-label {
        font-size: 24px;
        color: #333;
      }
    }
    &:before {
      content: '';
      position: absolute;
      top: 40px;
      left: 50%;
      width: 2px;
      height: 100%;
      background: #0000001f;
      height: 60px;
    }
  }

  .trend-chart {
    padding: 0 32px;
    margin-bottom: 32px;
    background: url('/img/financing-line.png') no-repeat;
    background-size: 100% 100%;
    height: 200px;
    position: relative;
    .trend-chart-day {
      position: absolute;
      bottom: 0;
      left: 8px;
      font-size: 20px;
      color: #666;
    }
    .trend-chart-value {
      position: absolute;
      top: -36px;
      right: 8px;
      font-size: 20px;
      color: #666;
    }
  }
}
.trend-chart-title {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 24px;
  .trend-chart-symbol {
    width: 32px;
    height: 12px;
    background: var(--primary-color);
    border-radius: 16px;
    margin-right: 8px;
  }
}
.buy-btn {
  margin: 32px;
  height: 88px;
  width: 686px;
  font-size: 32px;
}
</style>
