<template>
  <div class="download">
    <AppSiteNav />
    <div class="banner">
      <video autoplay muted loop playsinline class="banner-video">
        <source src="https://shopone123.oss-cn-hongkong.aliyuncs.com/qih/banner3.mp4" type="video/mp4" />
      </video>
      <div class="banner-text-1 gradient-text">屡获殊荣的全球期货</div>
      <div class="banner-text-2">交易服务商</div>
      <div class="banner-text-3 gradient-text">凭借卓越的技术与服务，多次荣膺行业大奖，深受全球投资者信赖</div>
      <SiteButton>联系我们</SiteButton>
    </div>
    <div class="site-width">
      <div class="download-box">
        <div class="site-width main-content">
          <div class="download-title gradient-text">多终端&nbsp;&nbsp;乐享交易</div>
          <div class="download-list">
            <div class="download-item">
              <div class="download-item-title gradient-text">APP</div>
              <div class="download-item-content">
                安装APP，享受移动专业交易 服务。APP全新改版，全新视感，全新理念，全新体验。
              </div>
              <div class="download-btn">
                <SiteButton>
                  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_304_58)">
                      <path
                        d="M20.801 20.2404H1.19901C0.836013 20.2404 0.539013 20.5374 0.539013 20.9004C0.539013 21.2634 0.836013 21.5604 1.19901 21.5604H20.801C21.164 21.5604 21.461 21.2634 21.461 20.9004C21.461 20.5374 21.164 20.2404 20.801 20.2404ZM5.46701 15.1474C6.01701 15.1474 6.56701 15.0594 7.12801 14.8834C7.48001 14.7734 7.67801 14.4104 7.56801 14.0584C7.45801 13.7064 7.09501 13.5084 6.74301 13.6184C6.30301 13.7504 5.89601 13.8164 5.47801 13.8164C3.24501 13.8164 1.41901 11.9904 1.41901 9.75743C1.41901 8.66843 1.84801 7.65643 2.61801 6.88643C3.38801 6.12743 4.38901 5.70943 5.46701 5.70943H5.55501C5.61001 5.72043 5.66501 5.72043 5.72001 5.72043C6.01701 5.72043 6.28101 5.53343 6.35801 5.24743C6.95201 3.20143 8.86601 1.77143 11 1.77143C13.398 1.77143 15.466 3.56443 15.796 5.94043C15.84 6.29243 16.148 6.53443 16.5 6.51243C16.632 6.50143 16.764 6.49043 16.896 6.49043C18.92 6.49043 20.559 8.12943 20.559 10.1534C20.559 12.1774 18.92 13.8164 16.896 13.8164C16.489 13.8164 16.082 13.7504 15.719 13.6184C15.378 13.4974 15.004 13.6844 14.883 14.0254C14.762 14.3664 14.949 14.7404 15.29 14.8614C15.796 15.0374 16.346 15.1254 16.907 15.1254C19.657 15.1254 21.89 12.8924 21.89 10.1424C21.89 7.42543 19.701 5.20343 16.995 5.15943C16.335 2.43143 13.86 0.44043 11.011 0.44043C8.45901 0.44043 6.17101 2.03543 5.22501 4.40043C3.88301 4.45543 2.62901 5.00543 1.67201 5.96243C0.649013 6.97443 0.0880127 8.32743 0.0880127 9.76843C0.0880127 12.7384 2.49701 15.1474 5.46701 15.1474Z"
                        fill="white"
                      />
                      <path
                        d="M11.011 10.8789C10.648 10.8789 10.351 11.1759 10.351 11.5389V17.0169L9.11901 15.7849C8.85501 15.5319 8.43701 15.5319 8.18401 15.7849C7.93101 16.0489 7.93101 16.4669 8.18401 16.7199L10.549 19.0849C10.67 19.2169 10.835 19.2829 11.011 19.2829C11.187 19.2829 11.352 19.2169 11.484 19.0849L13.838 16.7199C14.102 16.4559 14.102 16.0489 13.838 15.7849C13.574 15.5209 13.156 15.5319 12.903 15.7849L11.671 17.0169V11.5389C11.671 11.1759 11.374 10.8789 11.011 10.8789Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_304_58">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  扫码下载安卓APP
                </SiteButton>
                <div class="pop">
                  <div class="pop-title">扫码下载移动APP</div>
                  <div class="pop-content">
                    <VueQrcode
                      :value="qrcodeValue"
                      :options="{
                        errorCorrectionLevel: 'Q',
                        width: 160,
                        margin: 0,
                      }"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="download-item">
              <div class="download-item-title gradient-text">APP</div>
              <div class="download-item-content">
                安装APP，享受移动专业交易 服务。APP全新改版，全新视感，全新理念，全新体验。
              </div>
              <div class="download-btn">
                <SiteButton>
                  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_304_58)">
                      <path
                        d="M20.801 20.2404H1.19901C0.836013 20.2404 0.539013 20.5374 0.539013 20.9004C0.539013 21.2634 0.836013 21.5604 1.19901 21.5604H20.801C21.164 21.5604 21.461 21.2634 21.461 20.9004C21.461 20.5374 21.164 20.2404 20.801 20.2404ZM5.46701 15.1474C6.01701 15.1474 6.56701 15.0594 7.12801 14.8834C7.48001 14.7734 7.67801 14.4104 7.56801 14.0584C7.45801 13.7064 7.09501 13.5084 6.74301 13.6184C6.30301 13.7504 5.89601 13.8164 5.47801 13.8164C3.24501 13.8164 1.41901 11.9904 1.41901 9.75743C1.41901 8.66843 1.84801 7.65643 2.61801 6.88643C3.38801 6.12743 4.38901 5.70943 5.46701 5.70943H5.55501C5.61001 5.72043 5.66501 5.72043 5.72001 5.72043C6.01701 5.72043 6.28101 5.53343 6.35801 5.24743C6.95201 3.20143 8.86601 1.77143 11 1.77143C13.398 1.77143 15.466 3.56443 15.796 5.94043C15.84 6.29243 16.148 6.53443 16.5 6.51243C16.632 6.50143 16.764 6.49043 16.896 6.49043C18.92 6.49043 20.559 8.12943 20.559 10.1534C20.559 12.1774 18.92 13.8164 16.896 13.8164C16.489 13.8164 16.082 13.7504 15.719 13.6184C15.378 13.4974 15.004 13.6844 14.883 14.0254C14.762 14.3664 14.949 14.7404 15.29 14.8614C15.796 15.0374 16.346 15.1254 16.907 15.1254C19.657 15.1254 21.89 12.8924 21.89 10.1424C21.89 7.42543 19.701 5.20343 16.995 5.15943C16.335 2.43143 13.86 0.44043 11.011 0.44043C8.45901 0.44043 6.17101 2.03543 5.22501 4.40043C3.88301 4.45543 2.62901 5.00543 1.67201 5.96243C0.649013 6.97443 0.0880127 8.32743 0.0880127 9.76843C0.0880127 12.7384 2.49701 15.1474 5.46701 15.1474Z"
                        fill="white"
                      />
                      <path
                        d="M11.011 10.8789C10.648 10.8789 10.351 11.1759 10.351 11.5389V17.0169L9.11901 15.7849C8.85501 15.5319 8.43701 15.5319 8.18401 15.7849C7.93101 16.0489 7.93101 16.4669 8.18401 16.7199L10.549 19.0849C10.67 19.2169 10.835 19.2829 11.011 19.2829C11.187 19.2829 11.352 19.2169 11.484 19.0849L13.838 16.7199C14.102 16.4559 14.102 16.0489 13.838 15.7849C13.574 15.5209 13.156 15.5319 12.903 15.7849L11.671 17.0169V11.5389C11.671 11.1759 11.374 10.8789 11.011 10.8789Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_304_58">
                        <rect width="22" height="22" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  扫码下载苹果APP
                </SiteButton>
                <div class="pop">
                  <div class="pop-title">扫码下载苹果APP</div>
                  <div class="pop-content">
                    <VueQrcode
                      :value="qrcodeValue"
                      :options="{
                        errorCorrectionLevel: 'Q',
                        width: 160,
                        margin: 0,
                      }"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="download-item">
              <div class="download-item-title gradient-text">H5</div>
              <div class="download-item-content">无需下载，手机直接访问官网， 即开即用，轻快又专业的交易体验。</div>
              <div class="qrbtn download-btn">
                <SiteButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M1.43358 0.21875H13.8712C15.1361 0.342361 14.8312 2.53929 14.8312 3.96665V10.7623C14.8312 12.2392 15.1131 14.0495 14.1217 14.469C13.4761 14.7422 11.7433 14.5513 10.9079 14.5513H4.31351C2.78911 14.5513 0.707617 14.9104 0.473667 13.6041V1.16595C0.644165 0.702693 0.943957 0.367069 1.43358 0.21875ZM3.1448 3.01938V11.8743H12.1183V2.89577H3.18659C3.13797 2.9027 3.1413 2.96089 3.1448 3.01938ZM18.1284 0.21875H30.566C31.0733 0.404461 31.422 0.746981 31.526 1.33073V13.4394C31.4121 13.9426 31.146 14.3723 30.6495 14.5102C29.8382 14.7355 28.4902 14.5513 27.5192 14.5513H21.1335C20.1705 14.5513 18.7433 14.7515 17.9614 14.5102C16.8577 14.1694 17.1685 12.0434 17.1685 10.5563V4.21377C17.1685 2.49673 16.7865 0.458694 18.1284 0.21875ZM19.8396 3.01938V11.8743H28.8131V2.89577H19.8813C19.8328 2.9027 19.836 2.96089 19.8396 3.01938ZM7.23505 5.61403C8.48481 5.38133 9.4676 6.21462 9.48891 7.34389C9.51688 8.83308 7.9755 9.65105 6.77595 9.03255C5.40365 8.32471 5.49393 5.93833 7.23505 5.61403ZM23.9299 5.61403C26.8735 5.07139 26.8171 9.67178 23.9299 9.19726C22.0924 8.89528 22.0331 5.9638 23.9299 5.61403ZM13.7877 31.2728H1.47538C0.964195 31.1182 0.618868 30.8 0.473633 30.2844V17.8875C0.595268 17.5247 0.875897 17.1015 1.30838 16.9813C2.12545 16.7545 3.45987 16.9402 4.43861 16.9402H10.8244C11.7682 16.9402 13.1417 16.7323 13.9964 16.9813C15.1528 17.3183 14.8311 19.4097 14.8311 20.894V27.4425C14.8312 29.0446 15.1808 31.1298 13.7877 31.2728ZM3.1448 19.7408V28.5957H12.1183V19.6172H3.18659C3.13797 19.6242 3.1413 19.6823 3.1448 19.7408ZM31.526 18.0522V21.5118C31.4286 22.6787 31.5121 24.024 31.4842 25.2597H22.5943V23.2416C21.7594 23.1455 20.7439 23.2278 19.8396 23.2003C19.7422 25.8088 19.8258 28.5957 19.7979 31.2727H18.1701C16.7705 30.9959 17.1684 28.9236 17.1684 27.2778V20.894C17.1684 19.934 16.9715 18.4951 17.2102 17.7226C17.4949 16.8011 18.7295 16.9401 19.9649 16.9401H26.0166V22.4178H28.813C28.8408 20.6057 28.7573 18.6837 28.8547 16.9401C30.2005 16.8615 31.4469 16.8809 31.526 18.0522ZM7.44373 22.2943C8.77816 22.1485 9.88133 23.4141 9.36367 24.8066C8.64609 26.7369 5.21524 26.0113 5.85776 23.571C6.03529 22.8965 6.54834 22.3921 7.44373 22.2943ZM25.5994 31.2728H22.5943C22.6221 30.2156 22.5386 29.0488 22.636 28.0602H25.5994V31.2728ZM31.526 28.0602V30.1608C31.4099 30.7465 31.0629 31.1041 30.5243 31.2728H28.3957C28.4235 30.2156 28.3401 29.0488 28.4375 28.0602H31.526Z"
                      fill="white"
                    />
                  </svg>
                </SiteButton>

                <div class="pop">
                  <div class="pop-title">扫码手机网页</div>
                  <div class="pop-content">
                    <VueQrcode
                      :value="qrcodeValue"
                      :options="{
                        errorCorrectionLevel: 'Q',
                        width: 160,
                        margin: 0,
                      }"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="download-item">
              <div class="download-item-title gradient-text">PC/桌面端</div>
              <div class="download-item-content">
                市场大势，大屏纵览，多屏联动，功能更全。看盘更精彩， 分析如此便捷。
              </div>
              <div class="download-btn"><SiteButton>Windows</SiteButton></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppSiteFooter />
  </div>
</template>
<script setup lang="ts">
import SiteButton from '@/components/scopes/SiteButton.vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'

const qrcodeValue = computed(() => {
  if (import.meta.client) {
    return location.origin
  }
  return ''
})
</script>
<style scoped lang="less">
.banner {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding-top: 155px;
  padding-bottom: 115px;
  z-index: 1;
  .banner-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .site-button {
    width: 166px;
    height: 54px;
  }
  .banner-text-1,
  .banner-text-2 {
    font-size: 64px;
    line-height: 72px;
    font-weight: bold;
  }
  .banner-text-2 {
    color: #fff;
  }
  .banner-text-3 {
    font-size: 28px;
    margin-top: 38px;
    margin-bottom: 120px;
  }
}

.download {
  background: #05010d;
}

.download-box {
  padding: 120px 0 218px;
  text-align: center;
  .download-title {
    font-size: 36px;
    position: relative;
    text-align: center;
    font-weight: bold;
  }
  .download-list {
    display: flex;
    justify-content: center;
    gap: 40px;
    width: 100%;
    padding-top: 68px;
    .download-item {
      width: 380px;
      height: 273px;
      text-align: left;
      border-radius: 20px;
      overflow: visible;
      padding: 30px 35px 27px;
      position: relative;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: linear-gradient(0deg, rgba(22, 4, 8, 0.96) 0%, rgba(22, 4, 8, 0.96) 100%),
        linear-gradient(92deg, #ff5b37 0.52%, #ab0052 100%);
      box-shadow: 0px 0px 27px 0px rgba(173, 40, 40, 0.48);
      .download-item-title {
        font-size: 26px;
        font-weight: 600;
        &:after {
          content: '';
          position: absolute;
          right: 191px;
          top: 36px;
          width: 27px;
          height: 27px;
          background: url('/site/img/mark.png');
          background-size: contain;
        }
      }
      .download-item-content {
        font-size: 18px;
        padding-top: 18px;
        color: #bcbcbc;
      }
      .download-btn {
        position: relative;
        width: fit-content;
        margin-top: 24px;
        .site-button {
          display: flex;
          width: 238px;
          height: 54px;
          align-items: center;
          justify-content: center;
          & > svg {
            width: 16px;
            height: 16px;
            margin-right: 5px;
          }
        }
      }
    }
    .qrbtn.download-btn {
      .site-button {
        width: 54px;
        height: 54px;
        & > svg {
          width: 36px;
          height: 36px;
          margin-right: 0;
        }
      }
    }
    .pop {
      position: absolute;
      bottom: 70px;
      display: none;
      left: 0;
      font-size: 16px;
      color: #333;
      background: #fff;
      border: 1px solid #c00000;
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      canvas {
        width: 160px !important;
        height: 160px !important;
      }
    }
    .qrbtn:hover,
    .download-btn:hover {
      .pop {
        display: block;
      }
    }
  }
}

.title-line {
  &:after {
    content: '';
    display: block;
    width: 260px;
    height: 4px;
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    background: #c00000;
    border-radius: 2px;
  }
}
.pre-title-dec {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  .app-site-title-dec {
    position: absolute;
    left: -90px;
    top: 8px;
  }
}
</style>
