<template>
  <div class="ui-page">
    <div class="ui-content">
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
          <div class="topBar-title">买入</div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div v-if="manaDetail" class="trade-box">
          <div class="trade-info r-block">
            <div class="r-block-title">{{ manaDetail.name }}</div>
            <div class="trade-info-content">
              期限: {{ manaDetail.cal === '0' ? '永久' : `${manaDetail.day}天` }}, 收益结算方式:{{
                manaDetail.calItem === '0' ? '每日结算利息' : '到期结算利息'
              }}
            </div>
          </div>
          <div class="r-block trade-money">
            <div class="r-block-title">
              买入金额
              <span class="trade-money-subtitle">（可用余额：{{ userStore.userInfo.canMoney }} 元）</span>
            </div>
            <div class="trade-money-container">
              <div class="trade-money-symbol">¥</div>
              <input-currency
                v-model="tradeState.value"
                class="trade-money-input"
                :min="manaDetail.minValue"
                :max="userStore.userInfo.canMoney"
                :placeholder="manaDetail.minValue ? `最低买入${manaDetail.minValue}元` : '请输入买入金额'"
              />
            </div>
            <div class="input-money-tag-list">
              <div class="input-money-tag" @click="handleInputMoney(2000)">2000元</div>
              <div class="input-money-tag" @click="handleInputMoney(3000)">3000元</div>
              <div class="input-money-tag" @click="handleInputMoney(5000)">5000元</div>
            </div>
            <div class="trade-money-extra">买入0手续费，预计 {{ $dayjs().format('MM月-DD日dddd') }} 开始查看盈亏</div>
          </div>
        </div>
        <van-button
          class="submit-btn"
          color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
          block
          round
          @click="handleSubmit"
        >
          确认支付
        </van-button>
      </div>
      <van-popup v-model:show="tradeState.successPopVisible" round position="bottom">
        <div class="success-pop">
          <svg xmlns="http://www.w3.org/2000/svg" class="success-pop-icon" viewBox="0 0 52 52" fill="none">
            <g clip-path="url(#clip0_297_3986)">
              <path
                d="M26 0C11.642 0 0 11.642 0 26C0 40.358 11.642 52 26 52C40.358 52 52 40.358 52 26C52 11.642 40.358 0 26 0ZM37.2299 17.5094L25.0076 34.4558C24.2705 35.483 22.7442 35.483 22.0071 34.4558L14.7701 24.4272C14.5496 24.1196 14.7701 23.6902 15.1473 23.6902H17.8692C18.4612 23.6902 19.0241 23.9746 19.3723 24.4621L23.5045 30.196L32.6277 17.5442C32.9759 17.0625 33.533 16.7723 34.1308 16.7723H36.8527C37.2299 16.7723 37.4504 17.2018 37.2299 17.5094Z"
                fill="url(#paint0_linear_297_3986)"
              />
            </g>
            <defs>
              <linearGradient id="paint0_linear_297_3986" x1="26" y1="0" x2="26" y2="52" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E92F08" />
                <stop offset="1" stop-color="#6124E1" />
              </linearGradient>
              <clipPath id="clip0_297_3986">
                <rect width="52" height="52" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div class="success-pop-title">买入成功</div>
          <div class="success-pop-code">{{ manaDetail!.name }} {{ tradeState.value }}元</div>
          <van-button
            class="success-pop-btn"
            color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
            block
            round
            @click="handleSuccessPopConfirm"
          >
            确认
          </van-button>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '买入',
})
const userStore = useUserStore()
const router = useRouter()
const tradeState = reactive({
  value: '',
  successPopVisible: false,
})
const manaDetail = ref<Mana.ManaData>()

const handleInputMoney = (number) => {
  if (number < Number(manaDetail.value?.minValue)) {
    return $message.error('买入金额不能低于最低起购金额')
  }
  if (number > userStore.userInfo.canMoney) {
    return $message.error('可用余额不足')
  }
  tradeState.value = String(number)
}
const handleSubmit = async () => {
  if (Number(tradeState.value) === 0) {
    return $message.error('买入金额不能为0')
  }
  await $request.post(`/prod-api/home/buy`, {
    manaId: router.currentRoute.value.query.id,
    money: tradeState.value,
  })
  userStore.updateUserInfo()
  showSuccessPop()
}
const showSuccessPop = () => {
  tradeState.successPopVisible = true
}
const handleSuccessPopConfirm = () => {
  tradeState.successPopVisible = false
  router.push('/trade?type=1')
}
const loadData = async () => {
  const id = router.currentRoute.value.query.id
  const res = await $request(`/prod-api/home/mana/${id}`)
  manaDetail.value = res.data
}
onMounted(async () => {
  loadData()
  userStore.updateUserInfo()
})
</script>
<style lang="less" scoped>
.trade-box {
  margin-top: 32px;
  .trade-info {
    .trade-info-content {
      font-size: 28px;
      color: #666;
    }
  }
  .trade-money {
    .trade-money-subtitle {
      font-size: 28px;
      color: #999;
    }
    .trade-money-container {
      display: flex;
      align-items: center;
      .trade-money-symbol {
        font-size: 44px;
        margin-right: 16px;
      }
      .trade-money-input {
        font-size: 28px;
      }
    }
    .input-money-tag-list {
      display: flex;
      gap: 16px;
      padding: 20px 0;
      .input-money-tag {
        background: #ffdada;
        color: #f54444;
        padding: 6px 24px;
      }
    }
    .trade-money-extra {
      border-top: 2px solid #0000001f;
      padding-top: 20px;
      font-size: 20px;
      color: #666;
    }
  }
}
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
.r-block {
  padding: 30px 40px;
  margin: 0 32px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  margin-bottom: 32px;
  .r-block-title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
  }
}
.submit-btn {
  margin: 32px;
  height: 88px;
  width: 686px;
  font-size: 32px;
}
.success-pop {
  padding: 96px 32px 32px;
  text-align: center;
  .success-pop-icon {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .success-pop-title {
    font-size: 32px;
    color: #333;
    margin-bottom: 12px;
  }
  .success-pop-code {
    font-size: 28px;
    color: #666;
    margin-bottom: 40px;
  }
  .success-pop-btn {
    height: 88px;
    font-size: 32px;
  }
}
</style>
