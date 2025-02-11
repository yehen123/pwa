<template>
  <div class="ui-page">
    <div class="ui-content">
      <div class="ui-conent-fix">
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
          <div class="topBar-title">设置</div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="setting-group">
          <div class="setting-group-title">交易设置</div>
          <van-cell-group class="setting-group-list">
            <van-cell class="setting-group-item" title="开户认证" is-link @click="navigateTo('/mine/certification')">
              <div v-if="isCertification">已认证</div>
              <div v-else>未认证</div>
            </van-cell>
            <van-cell class="setting-group-item" title="资金密码" is-link @click="navigateTo('/mine/setPayPwd')">
              <div v-if="isSetPayPwd">已设置</div>
              <div v-else>未设置</div>
            </van-cell>
            <van-cell class="setting-group-item" title="CBPAY提币地址" is-link @click="navigateTo('/mine/bindCB')">
              <div v-if="isBindCB">已绑定</div>
              <div v-else>未绑定</div>
            </van-cell>
            <van-cell class="setting-group-item" title="USDT提币地址" is-link @click="navigateTo('/mine/bindU')">
              <div v-if="isBindU">已绑定</div>
              <div v-else>未绑定</div>
            </van-cell>
          </van-cell-group>
        </div>
        <div class="setting-group">
          <div class="setting-group-title">账户设置</div>

          <van-cell-group class="setting-group-list">
            <van-cell class="setting-group-item" title="绑定手机号码" is-link>
              <div>已绑定</div>
            </van-cell>
            <van-cell class="setting-group-item" title="修改密码" is-link @click="navigateTo('/mine/resetPwd')" />
          </van-cell-group>
        </div>
        <van-button
          class="logout-btn"
          color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
          round
          @click="handleLogout"
        >
          退出登录
        </van-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const userStore = useUserStore()
const router = useRouter()
const isCertification = computed(() => {
  return userStore.userInfo.iauth === '1'
})
const isSetPayPwd = computed(() => {
  return userStore.userInfo.zfPassword === '加密'
})
const isBindCB = computed(() => {
  return userStore.userInfo.cbRemark !== ''
})
const isBindU = computed(() => {
  return userStore.userInfo.uRemark !== ''
})
const handleLogout = async () => {
  await $confirm('确认退出登录?')
  try {
    await $request('/prod-api/auth/logout/home', { showError: false, showProgress: false })
  } catch (e) {}
  userStore.logout()
  router.push('/login')
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
.setting-group {
  padding: 32px 32px 0;
  margin-bottom: 24px;
  .setting-group-title {
    font-size: 26px;
    color: #333;
    margin-bottom: 28px;
  }
  .setting-group-list {
    border-radius: 20px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    font-size: 28px;
    overflow: hidden;

    .setting-group-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 0;
      padding-right: 28px;
      padding-left: 28px;

      &:not(:last-child):after {
        left: 28px;
        border-bottom: 2px solid #0000001f;
      }
      .setting-group-item-right {
        color: #666;
      }
    }
  }
}
.logout-btn {
  font-size: 30px;
  width: 680px;
  height: 88px;
  margin: 32px;
}
</style>
