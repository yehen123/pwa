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
          <div class="topBar-title">开户认证</div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="setting-box">
          <div class="setting-box-title">实名认证</div>
          <div class="setting-box-subtitle">请填写您的真实姓名和身份证号</div>
          <div class="setting-item">
            <div class="setting-item-title">
              证件姓名
              <span class="text-red-500">*</span>
            </div>
            <div class="setting-item-content">
              <input v-model="form.name" placeholder="请输入您的姓名" />
            </div>
            <div class="setting-item">
              <div class="setting-item-title">
                身份证号
                <span class="text-red-500">*</span>
              </div>
              <div class="setting-item-content">
                <input v-model="form.idCard" placeholder="请输入您的身份证号" />
              </div>
            </div>
          </div>
        </div>
        <div class="setting-box">
          <div class="setting-box-title">绑定银行卡</div>
          <div class="setting-box-subtitle">请填写您开户行和银行卡号</div>
          <div class="setting-item">
            <div class="setting-item-title">开户行</div>
            <div class="setting-item-content">
              <div class="relative" @click="bankPicker.show = true">
                <input v-model="form.bankName" placeholder="请选择您的开户行" readonly />
                <van-icon name="arrow-down" class="select-arrow" />
              </div>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-item-title">银行卡号</div>
            <div class="setting-item-content">
              <input v-model="form.bankCard" type="tel" placeholder="请输入您的银行卡号" />
            </div>
          </div>
        </div>
        <van-button
          class="submit-btn"
          color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
          round
          @click="handleSubmit"
        >
          提交认证
        </van-button>
        <van-popup v-model:show="bankPicker.show" round position="bottom">
          <van-picker
            title="选择开户行"
            :columns="bankPicker.columns"
            @cancel="bankPicker.show = false"
            @confirm="handleBankPickerConfirm"
          />
        </van-popup>
        <PayPwd ref="payPwdRef" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PayPwd from '@/components/scopes/PayPwd.vue'
const router = useRouter()
const userStore = useUserStore()
const isSetPayPwd = computed(() => {
  return userStore.userInfo.zfPassword === '加密'
})
onMounted(() => {
  if (!isSetPayPwd.value) {
    router.replace('/mine/setPaypwd')
  }
})
const form = reactive({
  name: userStore.userInfo.sfzName,
  idCard: userStore.userInfo.sfz,
  bankName: userStore.userInfo.bank,
  bankCard: userStore.userInfo.bankNo,
})
const payPwdRef = ref()
const bankList = [
  '中国银行',
  '中国工商银行',
  '中国农业银行',
  '中国建设银行',
  '中国交通银行',
  '招商银行',
  '浦发银行',
  '民生银行',
  '兴业银行',
  '深圳发展银行',
  '华夏银行',
  '光大银行',
  '广发银行',
  '中信银行',
  '平安银行',
  '浙商银行',
  '邮政储蓄银行',
]
const bankPicker = reactive({
  show: false,
  columns: bankList.map((item) => ({
    text: item,
    value: item,
  })),
})
const handleBankPickerConfirm = ({ selectedValues }) => {
  form.bankName = selectedValues[0]
  bankPicker.show = false
}
const handleSubmit = async () => {
  if (!form.name) {
    return $message.error('请输入姓名')
  }
  if (!form.idCard) {
    return $message.error('请输入身份证号')
  }
  const payPwd = await payPwdRef.value.inputPwd()
  try {
    await $request.post('/prod-api/home/user/iauth', {
      sfzName: form.name,
      sfz: form.idCard,
      bank: form.bankName,
      bankNo: form.bankCard,
      zfPassword: payPwd,
    })
    await userStore.updateUserInfo()
    $message.success('绑定成功')
    router.back()
  } catch (e) {}
}
</script>
<style lang="less" scoped>
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
.setting-box {
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  margin: 32px 32px;
  padding: 28px;
  .setting-box-title {
    font-size: 32px;
    color: #000;
    font-weight: 600;
  }
  .setting-box-subtitle {
    font-size: 24px;
    color: #666;
    font-weight: 400;
  }
  .setting-item {
    padding-top: 32px;
    .setting-item-title {
      font-size: 28px;
      color: #333;
      margin-bottom: 24px;
    }
    .setting-item-content {
      input {
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
        border-radius: 20px;
        height: 72px;
        width: 100%;
        padding: 0 20px;
      }
      .select-arrow {
        position: absolute;
        right: 20px;
        top: 20px;
        bottom: 0;
        margin: auto;
        font-size: 32px;
        color: #999;
      }
    }
  }
}
.code-btn {
  background: linear-gradient(90deg, #e92f08 0%, #6124e1 100%);
  color: #fff;
  font-size: 28px;
  width: 200px;
  height: 72px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  &.disabled {
    color: #7f8192;
    background: #f5f6fa;
  }
}
.submit-btn {
  font-size: 30px;
  width: 680px;
  height: 88px;
  margin: 32px;
}
</style>
