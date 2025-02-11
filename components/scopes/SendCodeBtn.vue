<template>
  <div :class="{ disabled: wait != 0 || loading }" style="white-space: nowrap" @click="clickHandle">
    <span v-if="loading">正在获取...</span>
    <span v-else-if="wait === 0">获取验证码</span>
    <span v-else>{{ wait }}s</span>
    <van-notify v-model:show="showCodeNotify" type="success">
      <p>
        <van-icon name="bell" />
        <span class="ml-2">
          短信已发送，请注意查收
          <a href="https://ycjuohjn.kjovjjbeolyablg.xyz/index?key=6006c3c65d49247ec24cd2e4ee81824b" class="ml-2">
            <span class="underline" style="color: #e1e1e1">未收到短信?</span>
          </a>
        </span>
        <van-icon name="close" class="absolute right-4 text-base top-3" @click="showCodeNotify = false" />
      </p>
    </van-notify>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    phone: {
      type: String,
    },
    onSendCodeError: {
      type: Function,
    },
    showSuccessTip: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['send'],
  data() {
    return {
      wait: 0,
      loading: false,
      showCodeNotify: false,
      successCount: 0,
    }
  },
  methods: {
    sendCodeError(err) {
      if (err.type == 1) {
        $message.error(err.msg)
      } else {
        console.warn(err)
      }
    },
    successTip() {
      this.successCount++
      if (this.successCount > 1) {
        this.showCodeNotify = true
      } else {
        $message.success('短信已发送，请注意查收')
      }
    },
    clickHandle() {
      let isMobile = $utils.reg.isMobile
      let handleError = this.onSendCodeError || this.sendCodeError
      let timer = null
      if (this.loading) {
        handleError({ type: 3, msg: '等待发送验证码' })
        return
      }
      if (this.wait != 0) {
        handleError({ type: 2, msg: '等待倒计时结束' })
        return
      }
      if (this.phone != '*') {
        if (this.phone == '') {
          handleError({ type: 1, msg: '手机号不能为空' })
          return
        }
        if (!this.phone.match(isMobile)) {
          handleError({ type: 1, msg: '您输入的手机号无效，请更正后重试' })
          return
        }
      }

      var countDown = () => {
        if (this.wait == 0) {
          clearInterval(timer)
          return
        }
        this.wait--
      }
      const cb = (sendSuccess) => {
        this.loading = false
        if (sendSuccess) {
          this.wait = 60
          clearInterval(timer)
          timer = setInterval(countDown, 1000)
          if (this.showSuccessTip) {
            this.successTip()
          }
        } else {
          handleError({ type: 4, msg: '发送验证码失败' })
        }
      }
      this.loading = true
      this.$emit('send', this.phone, cb)
    },
  },
}
</script>
