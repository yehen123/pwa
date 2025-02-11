<template>
  <div class="ui-page">
    <div class="ui-content invite-code">
      <div class="qrcode-container">
        <figure v-if="qrcodeValue" class="qrcode">
          <VueQrcode
            :value="qrcodeValue"
            :options="{
              errorCorrectionLevel: 'Q',
              color: {
                dark: '#fff',
                light: '#fff0',
              },
              width: 160,
              margin: 0,
            }"
          />
          <img class="qrcode__image" src="/img/logo-main.png" />
        </figure>
        <div class="usercode">{{ userStore.userInfo.userCode }}</div>

        <van-button class="copy-btn" color="#01cfa8" round @click="copyQr">复制推荐码地址</van-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VueQrcode from '@chenfengyuan/vue-qrcode'
useHead({
  title: '邀请码',
})
const userStore = useUserStore()

const qrcodeValue = computed(() => {
  const pCode = userStore.userInfo.userCode
  if (pCode) {
    return location.origin + `/login?pCode=${pCode}`
  }
  return ''
})
const copyQr = async () => {
  const { toClipboard } = useClipboard()
  await toClipboard(qrcodeValue.value)
  $message.success('复制成功')
}
onMounted(() => {})
</script>
<style lang="less" scoped>
.invite-code {
  background:
    linear-gradient(180deg, #e62f0e 0%, #6625d9 100%),
    url(<path-to-image>) lightgray 50% / cover no-repeat;
}
.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 690px;
  border-radius: 16px;

  margin: 30px auto;
  padding: 32px 24px;
}
.usercode {
  color: #fff;
  font-size: 36px;
  margin-top: 24px;
  font-weight: 600;
}
.copy-btn {
  height: 60px;
  font-size: 32px;
  margin-top: 24px;
}
.qrcode {
  font-size: 0;
  margin-bottom: 0;
  position: relative;
  padding: 20px;
}

.qrcode__image {
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  height: 15%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15%;
}
</style>
