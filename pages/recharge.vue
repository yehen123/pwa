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
          <div class="topBar-title">充值</div>
          <div class="topBar-right">
            <a @click="router.push('/rechargeRecord')">充值记录</a>
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
        <div class="recharge-money">
          <div>充值金额</div>
          <div class="recharge-money-container">
            <div class="money-symbol">¥</div>
            <div class="recharge-money-input-container">
              <input-currency
                v-model="rechargeValue"
                class="recharge-money-input"
                placeholder="最低充值100.00元"
                :min="100"
              />
            </div>
          </div>
          <div v-if="typePicker.value === 1">
            <div class="recharge-money-exchange">
              <div class="recharge-money-exchange-value">
                <span class=""><img src="/img/usdt.png" class="recharge-money-exchange-value-icon" /></span>
                <span class="ml-4">
                  {{ $utils.format.toCurrency(Number(rechargeValue) / usdtRate, '', 4) }}
                </span>
              </div>
              <div class="recharge-money-exchange-rate">
                <span class="">汇率USDT:CNY</span>
                <span class="ml-4">1:{{ usdtRate }}</span>
              </div>
            </div>
            <div class="recharge-money-exchange-extra">
              <div class="mt-4">
                返现比例
                <span class="text-primary">{{ usdtGive }}%</span>
                , 返现金额
                <span class="text-primary">
                  {{ $utils.format.toCurrency(Number(rechargeValue) * usdtGive * 0.01) }}
                </span>
                元
              </div>
              <div class="text-primary">USDT:CNY汇率为1：{{ usdtRate }}</div>
              <div class="text-primary">
                实际充值USDT金额为:{{ $utils.format.toCurrency(Number(rechargeValue) / usdtRate, '', 4) }}
              </div>
            </div>
          </div>
        </div>
        <div class="r-block">
          <div class="text-sm">备注</div>
          <div><input v-model="rechargeRemark" placeholder="请在这里输入备注" /></div>
        </div>

        <div v-if="typePicker.value === 0">
          <div class="rule">
            <div class="rule-title">温馨提示:</div>
            <div class="rule-item">1.充值时请使用CB充值网络进行充值，否则资产将无法到账。</div>
            <div class="rule-item">2.最小充值金额:100元，小于最小金额的充值将不会上账且无法退回。</div>
          </div>
        </div>
        <div v-if="typePicker.value === 1">
          <div v-if="manualPay" class="manual-pay">
            <div class="manual-pay-current">正在使用手动付款</div>
            <div class="manual-pay-switch" @click="manualPay = false">切换到自动付款</div>
          </div>
          <div v-if="manualPay" class="recharge-qr">
            <div class="recharge-qr-value">{{ qrcodeValue }}</div>
            <van-button
              class="recharge-copy-btn"
              color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
              round
              @click="copyQr"
            >
              复制收款地址
            </van-button>
          </div>

          <div v-if="!manualPay" class="manual-pay">
            <div class="manual-pay-current">正在使用自动付款</div>
            <div class="manual-pay-switch" @click="manualPay = true">切换到手动付款</div>
          </div>

          <div class="rule">
            <div class="rule-title">温馨提示:</div>
            <div class="rule-item">1.充值时请使用USDT充值网络进行充值，否则资产将无法到账。</div>
            <div class="rule-item">2.您的充值地址不会经常改变，可以重复充值;如有更改我们会尽快通知您</div>
          </div>
        </div>
        <div class="flex justify-center">
          <van-button
            class="recharge-btn"
            color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
            round
            @click="handleRecharge"
          >
            确认充值
          </van-button>
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
useHead({
  title: '充值提现',
})
const router = useRouter()
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

const rechargeValue = ref('')
const rechargeRemark = ref('')
const manualPay = ref(false)
const usdtRate = ref(0)
const usdtGive = ref(0)

const qrcodeValue = ref('TZEopdbv5bvyevzj3reSjiuqUyyKhqRx4v')

const handleTypePickerConfirm = ({ selectedValues }) => {
  typePicker.value = selectedValues[0]
  typePicker.show = false
}
const copyQr = async () => {
  const { toClipboard } = useClipboard()
  await toClipboard(qrcodeValue.value)
  $message.success('复制成功')
}
const handleRecharge = async () => {
  if (!rechargeValue.value) {
    return $message.error('请输入充值金额')
  }
  const res = await $request.post('/prod-api/home/recharge', {
    price: rechargeValue.value,
    type: typePicker.value,
    eType: manualPay.value ? 'TRC20' : 'USDT',
    remark: rechargeRemark.value,
  })
  // USDT 手动付款，只添加一条充值记录，线下核实是否到账
  if (typePicker.value === 1 && manualPay.value) {
    $message.success('提交成功')
    navigateTo('/rechargeRecord')
  } else {
    // 跳转到充值url
    window.location.href = res.data
  }
}
const loadusdtRate = async () => {
  if (usdtRate.value) {
    return
  }
  const res = await $request.get('/prod-api/home/config/configKey/sys.usdt')
  usdtRate.value = Number(res.data)
}
const loadusdtGive = async () => {
  if (usdtGive.value) {
    return
  }
  const res = await $request.get('/prod-api/home/config/configKey/sys.usdt.give')
  usdtGive.value = Number(res.data)
}
onMounted(async () => {
  loadusdtRate()
  loadusdtGive()
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
.recharge-money {
  margin: 32px 36px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 30px 40px;
  .money-symbol {
    font-size: 44px;
    margin-left: 8px;
    line-height: 1;
  }
  .recharge-money-container {
    display: flex;
    align-items: flex-end;
    margin-top: 28px;

    .recharge-money-input-container {
      padding-left: 24px;
      .recharge-money-input {
        font-size: 30px;
        padding-left: 4px;
        &::-webkit-input-placeholder {
          color: #666;
        }
      }
    }
  }
  .recharge-money-exchange {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    color: #333;
    font-size: 28px;
    .recharge-money-exchange-value {
      display: flex;
      align-items: center;
      .recharge-money-exchange-value-icon {
        width: 60px;
        height: 60px;
      }
    }
  }
  .recharge-money-exchange-extra {
    color: #666;
    font-size: 20px;
  }
}
.recharge-qr {
  border-radius: 20px;
  margin: 32px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.manual-pay {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 32px 0;
  .manual-pay-current {
    &:extend(.font-gradient);

    font-size: 28px;
  }
  .manual-pay-switch {
    font-size: 24px;
    color: #6490f3;
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
.recharge-qr-img {
  width: 316px;
  height: 316px;
  margin: 20px auto;
  background: url('/public/img/recharge-qrcode.png');
  background-size: cover;
}
.recharge-qr-value {
  width: 630px;
  height: 94px;
  border-radius: 10px;

  background: #fafafa;
  font-size: 24px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}
.recharge-copy-btn {
  height: 60px;
  font-size: 32px;
}
.recharge-btn {
  font-size: 30px;
  width: 680px;
  height: 88px;
  margin-bottom: 40px;
}

.r-block {
  padding: 30px 40px;
  margin: 0 32px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  input {
    font-size: 28px;
    padding: 16px 0 0;
    &::-webkit-input-placeholder {
      color: #999;
    }
  }
}
</style>
