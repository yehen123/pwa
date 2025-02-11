<template>
  <van-popup v-model:show="show" class="payPwd-pop" position="bottom">
    <div class="payPwd-pop-title">请输入资金密码</div>
    <van-password-input :value="payPwd" :focused="true" />
    <van-number-keyboard v-model="payPwd" :show="true" @blur="handleBlur" />
  </van-popup>
</template>
<script setup lang="ts">
const show = ref(false)
const payPwd = ref('')
let end

watch(payPwd, (value) => {
  if (value.length === 6) {
    end?.(true, value)
  }
})
const handleBlur = () => {
  show.value = false
  end?.(false, '')
}
const inputPwd = () => {
  payPwd.value = ''
  show.value = true
  return new Promise((resolve, reject) => {
    end = (isResolve, value) => {
      show.value = false
      if (isResolve) {
        resolve(value)
      } else {
        reject(new Error('E_INPUT_CANCEL'))
      }
    }
  })
}
defineExpose({
  inputPwd,
})
</script>
<style lang="less" scoped>
.payPwd-pop {
  padding-bottom: 500px;
  background: #f2f3f5;
  .payPwd-pop-title {
    padding: 32px 32px 16px;
    font-size: 32px;
    font-weight: 600;
    color: #333;
  }
}
</style>
