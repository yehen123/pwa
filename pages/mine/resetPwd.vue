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
          <div class="topBar-title">修改密码</div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="setting-box">
          <div class="setting-box-title">设置登录密码</div>
          <div class="setting-box-subtitle">请先输入正确的旧密码并设置新的登录密码</div>
          <van-cell-group inset>
            <client-only>
              <van-field
                v-model="form.oldPassword"
                label="旧密码"
                placeholder="请输入旧密码"
                :type="form.showPwd ? 'text' : 'password'"
              >
                <template #right-icon>
                  <div
                    class="show-pwd"
                    :class="{ close: !form.showPwd }"
                    @touchstart.prevent="form.showPwd = !form.showPwd"
                  >
                    <van-icon name="eye-o" class="block" />
                  </div>
                </template>
              </van-field>
            </client-only>
            <client-only>
              <van-field
                v-model="form.newPassword"
                label="新密码"
                placeholder="请输入新密码"
                :type="form.showPwd ? 'text' : 'password'"
              >
                <template #right-icon>
                  <div
                    class="show-pwd"
                    :class="{ close: !form.showPwd }"
                    @touchstart.prevent="form.showPwd = !form.showPwd"
                  >
                    <van-icon name="eye-o" class="block" />
                  </div>
                </template>
              </van-field>
            </client-only>
            <client-only>
              <van-field
                v-model="form.confirmPassword"
                label="确认新密码"
                placeholder="请确认新密码"
                :type="form.showPwd ? 'text' : 'password'"
              >
                <template #right-icon>
                  <div
                    class="show-pwd"
                    :class="{ close: !form.showPwd }"
                    @touchstart.prevent="form.showPwd = !form.showPwd"
                  >
                    <van-icon name="eye-o" class="block" />
                  </div>
                </template>
              </van-field>
            </client-only>
          </van-cell-group>
        </div>
        <van-button
          class="resetPwd-btn"
          color="linear-gradient(90deg, #E92F08 0%, #6124E1 100%)"
          round
          :loading="loading"
          @click="handleSubmit"
        >
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '修改密码',
})
const router = useRouter()

const form = reactive({
  oldPassword: '',
  showPwd: false,
  newPassword: '',
  confirmPassword: '',
})
const loading = ref(false)
const handleSubmit = async () => {
  if (!form.oldPassword) {
    return $message.error('请输入旧密码')
  }
  if (!form.newPassword) {
    return $message.error('请输入新密码')
  }
  if (form.newPassword !== form.confirmPassword) {
    return $message.error('新密码和确认新密码输入不一致，请确认')
  }
  loading.value = true
  try {
    await $request.post('/prod-api/home/user/password', form)
    $message.success('修改密码成功')
    router.back()
  } catch (e) {}
  loading.value = false
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
  :deep(.van-cell-group--inset) {
    margin: 32px -28px 0;
  }
}
.resetPwd-btn {
  font-size: 30px;
  width: 680px;
  height: 88px;
  margin: 32px;
}
.show-pwd {
  position: absolute;
  right: 24px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 40px;
  height: 40px;
  color: #7f8192;

  &.close {
    &::after {
      content: '';
      position: absolute;
      left: calc(50% + 2px);
      top: 4px;
      height: 100%;
      width: 4px;
      background-color: #7f8192;
      transform: rotate(45deg);
    }
  }
}
</style>
