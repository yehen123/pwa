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
          <div class="topBar-title">设置资金密码</div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="setting-box">
          <div class="setting-box-title">设置资金密码</div>
          <div class="setting-box-subtitle">为确保您的资金安全，请设置一个安全的资金密码</div>
          <div class="setting-item">
            <div class="setting-item-title">验证码</div>
            <div class="setting-item-content">
              <div class="flex">
                <div class="flex-1">
                  <input v-model="form.code" placeholder="请输入验证码" />
                </div>
                <SendCodeBtn class="code-btn" :phone="userStore.userInfo.phonenumber" @send="doSendCode"></SendCodeBtn>
              </div>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-item-title">资金密码</div>
            <div class="setting-item-content">
              <van-password-input :value="form.payPwd" :focused="form.showPayPwdKeyboard" @focus="payPwdFocus" />
              <van-number-keyboard
                v-model="form.payPwd"
                :show="form.showPayPwdKeyboard"
                @blur="form.showPayPwdKeyboard = false"
              />
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-item-title">确认资金密码</div>
            <div class="setting-item-content">
              <van-password-input
                :value="form.confirmPayPwd"
                :focused="form.showConfirmPayPwdKeyboard"
                @focus="confirmPayPwdFocus"
              />
              <van-number-keyboard
                v-model="form.confirmPayPwd"
                :show="form.showConfirmPayPwdKeyboard"
                @blur="form.showConfirmPayPwdKeyboard = false"
              />
            </div>
          </div>
        </div>
        <van-button
          class="submit-btn"
          color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
          round
          @click="handleSubmit"
        >
          确认设置
        </van-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SendCodeBtn from '@/components/scopes/SendCodeBtn.vue'
const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  payPwd: '',
  showPayPwdKeyboard: false,
  code: '',
  confirmPayPwd: '',
  showConfirmPayPwdKeyboard: false,
})

const payPwdFocus = () => {
  form.showPayPwdKeyboard = true
  form.showConfirmPayPwdKeyboard = false
}
const confirmPayPwdFocus = () => {
  form.showPayPwdKeyboard = false
  form.showConfirmPayPwdKeyboard = true
}
const doSendCode = async (phone, cb) => {
  try {
    await $request.get(`/prod-api/home/user/codePwd`)
    cb(true)
  } catch (e) {
    cb(false)
  }
}

const handleSubmit = async () => {
  if (!form.code) {
    return $message.error('请输入验证码')
  }
  if (!form.payPwd) {
    return $message.error('请输入资金密码')
  }
  if (form.payPwd !== form.confirmPayPwd) {
    return $message.error('两次输入的密码不一致')
  }
  try {
    await $request.post('/prod-api/home/user/zfpassword', {
      phoneCode: form.code,
      zfPassword: form.payPwd,
    })
    await userStore.updateUserInfo()
    $message.success('设置成功')
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
:deep(.van-password-input) {
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  --van-password-input-margin: 0;
}
</style>
