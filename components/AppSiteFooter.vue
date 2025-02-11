<template>
  <div class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <div class="footer-section">
          <div class="section-title">期货服务</div>
          <a href="/site/download">软件下载</a>
          <!-- <a href="/">服务与收费</a> -->
        </div>
        <div class="footer-section">
          <div class="section-title">了解我们</div>
          <a href="/site/about">关于我们</a>
          <a href="/">联系我们</a>
        </div>
        <!-- <div class="footer-section">
          <div class="section-title">条款声明</div>
          <a href="/">隐私声明</a>
          <a href="/">客户协议</a>
          <a href="/">免责声明</a>
        </div> -->
        <!-- <div class="footer-section">
          <a
            class="section-title"
            href="https://iyctuzeo.yyboggzvtacgjom.top/index?key=09349234dd5b9b7d34c05ddb537094f3"
            target="_blank"
          >
            联系客服
          </a>
        </div> -->
      </div>
      <div class="footer-right">
        <div class="phone">
          <div class="phone-text">+(852)888 8888</div>
          <div class="phone-button">在线咨询</div>
        </div>
        <div class="qrcode">
          <div class="qrcode-container">
            <VueQrcode
              :value="qrcodeValue"
              :options="{
                errorCorrectionLevel: 'Q',
                width: 84,
                margin: 0,
              }"
            />
          </div>
          <div class="qrcode-text">扫码体验极速交易</div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-highlight">交易日:09:00-17:30</div>
        <div class="footer-bottom-highlight">香港证监会认可的持牌法团(中央编号:BRE865)，提供证券交易服务并受其监管</div>
        <div class="footer-bottom-gray">风险提示:投资有风险，入市需谨慎</div>
        <div class="footer-bottom-gray">©2020 能敬资本(香港)有限公司版权所有</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import VueQrcode from '@chenfengyuan/vue-qrcode'
const qrcodeValue = computed(() => {
  if (import.meta.client) {
    return location.origin
  }
  return ''
})
</script>
<style scoped lang="less">
.footer {
  position: relative;
  background: #0c1326;
  color: #fff;
  padding: 60px 0;
  z-index: 3;
  .footer-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .footer-links {
      display: flex;
      justify-content: space-between;
    }

    .footer-section {
      margin-right: 80px;
      .section-title {
        font-size: 20px;
        margin-bottom: 18px;
      }

      a {
        display: block;
        color: #c5c5ce;
        text-decoration: none;
        margin-top: 14px;
        font-size: 14px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .footer-right {
    display: flex;
    .phone {
      margin-right: 46px;
      .phone-text {
        font-size: 20px;
        margin-top: 16px;
        margin-bottom: 16px;
      }
      .phone-button {
        width: 130px;
        height: 40px;
        line-height: 40px;
        border-radius: 5px;
        font-size: 14px;
        margin: 0 auto;
        border: 1px solid #fff;
        cursor: pointer;
        text-align: center;
      }
    }
    .qrcode {
      text-align: center;
      .qrcode-container {
        display: flex;
        justify-content: center;
        canvas {
          width: 84px !important;
          height: 84px !important;
          border: 4px solid #fff;
        }
      }

      .qrcode-text {
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }

  .footer-bottom {
    width: 100%;
    padding-top: 60px;
    .footer-bottom-highlight {
      font-size: 16px;
      margin-bottom: 16px;
      color: #fff;
    }
    .footer-bottom-gray {
      font-size: 14px;
      margin-top: 24px;
      color: #c5c5ce;
    }
  }
}
</style>
