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
          <div class="topBar-title">提现</div>
          <div class="topBar-right">
            <a @click="router.push('/withdrawRecord')">提现记录</a>
          </div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="recharge-type" @click="typePicker.show = true">
          <div v-if="typePicker.value === 0" class="recharge-type-item">
            <img src="/img/cbpay.png" class="recharge-type-icon" />
            <div class="recharge-type-name">CBpay</div>
            <van-tag plain color="#FE9B91" class="recharge-type-tag">费率0折</van-tag>
            <van-icon name="arrow-down" class="recharge-type-downarrow"></van-icon>
          </div>
          <div v-if="typePicker.value === 1" class="recharge-type-item">
            <img src="/img/usdt.png" class="recharge-type-icon" />
            <div class="recharge-type-name">USDT</div>
            <van-tag plain color="#FE9B91" class="recharge-type-tag">费率0折</van-tag>
            <van-icon name="arrow-down" class="recharge-type-downarrow"></van-icon>
          </div>
        </div>

        <div class="withdraw-money">
          <div class="withdraw-money-title">
            提现金额
            <span class="withdraw-money-title-sub">提现免手续费</span>
          </div>
          <div class="withdraw-money-container">
            <div class="money-symbol">¥</div>
            <div class="withdraw-money-input-container">
              <input-currency
                v-model="withdrawValue"
                class="withdraw-money-input"
                placeholder="0 元"
                :max="userStore.userInfo.moneyBottom"
              />
            </div>
          </div>

          <div class="withdraw-money-extra">
            <div class="">可提现金额：{{ $utils.format.toCurrency(userStore.userInfo.moneyBottom) }}</div>

            <div class="withdraw-all" @click="withdrawAll">全部提现</div>
          </div>
        </div>

        <div class="r-block">
          <div class="text-sm">提币地址</div>
          <div class="add-btn" @click="setUrl">设置提币地址</div>
          <div><input v-model="uUrl" placeholder="请在这里输入提币地址" readonly /></div>
        </div>
        <div class="r-block">
          <div class="text-sm">备注</div>
          <div><input v-model="remark" placeholder="请在这里输入备注" /></div>
        </div>
        <div class="rule">
          <div class="rule-title">温馨提示:</div>
          <div class="rule-item">1.请仔细核对提币地址，提币后将无法撤销</div>
          <div class="rule-item">
            2.为了资产安全，当您账户安全策略变更、密码修改、使用新地址提币，我们会对提币进行人工审核，请耐心够待。
          </div>
        </div>
        <div class="flex justify-center">
          <van-button
            class="submit-btn"
            color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
            round
            @click="handleWithdraw"
          >
            确认提现
          </van-button>
          <PayPwd ref="payPwdRef" />
        </div>
        <van-popup v-model:show="typePicker.show" round position="bottom">
          <van-picker
            title="选择充值方式"
            :columns="typePicker.columns"
            @cancel="typePicker.show = false"
            @confirm="handleTypePickerConfirm"
          />
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PayPwd from '@/components/scopes/PayPwd.vue'
import { useKaCtrl } from '@/composables/useKaCtrl'
const { tempKeep } = useKaCtrl()
useHead({
  title: '提现',
})
// defineOptions({
//   name: 'Withdrawt',
// })

const router = useRouter()
const userStore = useUserStore()
const withdrawValue = ref('')

const remark = ref('')
const payPwdRef = ref()
const typePicker = reactive({
  show: false,
  columns: [
    {
      text: 'USDT',
      value: 1,
    },
    {
      text: 'CBpay',
      value: 0,
    },
  ],
  value: 1,
})
const uUrl = computed(() => {
  return typePicker.value === 0 ? userStore.userInfo.cbRemark : userStore.userInfo.uRemark
})
const handleTypePickerConfirm = ({ selectedValues }) => {
  typePicker.value = selectedValues[0]
  typePicker.show = false
}
const withdrawAll = () => {
  withdrawValue.value = userStore.userInfo.moneyBottom
}
const handleWithdraw = async () => {
  // refreshNuxtData()
  if (!withdrawValue.value) {
    return $message.error('请输入提现金额')
  }
  const payPwd = await payPwdRef.value.inputPwd()
  await $request.post('/prod-api/home/apply', {
    price: withdrawValue.value,
    type: typePicker.value,
    remark: remark.value,
    uUrl: uUrl.value,
    zfPassword: payPwd,
  })
  $message.success('提交成功')
  navigateTo('/withdrawRecord')
}
const setUrl = () => {
  tempKeep()

  if (typePicker.value === 0) {
    navigateTo('/mine/bindCB')
  } else {
    navigateTo('/mine/bindU')
  }
}
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
    right: 32px;
    top: 32px;
    margin-top: 8px;
    bottom: 0;
    font-size: 28px;
    color: #6490f3;
  }
}
.recharge-type {
  height: 96px;
  display: flex;
  margin: 32px 36px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  .recharge-type-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 32px;
    width: 100%;
    .recharge-type-icon {
      width: 38px;
      height: 38px;
    }
    .recharge-type-name {
      color: #333;
      margin-left: 24px;
    }
    .recharge-type-tag {
      background: #ffd9d5;
      margin-left: 24px;
    }
    .recharge-type-downarrow {
      position: absolute;
      right: 24px;
      font-size: 32px;
    }
  }
}
.add-btn {
  position: absolute;
  right: 32px;
  top: 32px;
  font-size: 24px;
  color: #6490f3;
}
.withdraw-money {
  margin: 32px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding: 30px 40px;

  .withdraw-money-title {
    font-size: 32px;
    color: #000;
    font-weight: bold;
    .withdraw-money-title-sub {
      color: #666;
      font-size: 28px;
      font-weight: normal;
      margin-left: 16px;
    }
  }
  .money-symbol {
    font-size: 44px;
    margin-left: 8px;
    line-height: 1;
  }
  .withdraw-money-container {
    display: flex;
    align-items: flex-end;
    margin-top: 28px;
    border-bottom: 2px solid #0000001f;
    .withdraw-money-input-container {
      padding-left: 24px;
      .withdraw-money-input {
        font-size: 30px;
        padding-left: 4px;
        &::-webkit-input-placeholder {
          color: #666;
        }
      }
    }
  }
  .withdraw-money-extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    color: #333;
    font-size: 24px;
    .withdraw-all {
      color: #6490f3;
    }
  }
}
.rule {
  border-radius: 16px;
  border: 2px solid var(--primary-color);
  margin: 32px;
  padding: 32px 24px;
  background: #ffdada;
  .rule-title {
    color: #333333;
    font-size: 32px;
    font-weight: bold;
  }
  .rule-item {
    font-size: 28px;
    font-weight: 300;
    color: #666;
  }
}
.submit-btn {
  font-size: 30px;
  width: 680px;
  height: 88px;
  margin-bottom: 40px;
}

.r-block {
  padding: 30px 40px;
  margin: 32px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  position: relative;
  input {
    font-size: 28px;
    padding: 16px 0 0;
    &::-webkit-input-placeholder {
      color: #999;
    }
  }
}
</style>
