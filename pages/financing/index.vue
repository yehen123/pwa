<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
      <div class="ui-content-auto">
        <div v-if="bMana" class="financing-main">
          <div class="financing-title">全民理财</div>
          <div class="financing-subtitle">共享财富盛宴，让你的钱生钱</div>
          <div class="best-product-box">
            <div class="best-product-hd">优选产品</div>
            <div class="best-product-bd">
              <div class="product-card" @click="navigateTo(`/financing/manaDetail?id=${bMana.id}`)">
                <div class="product-name">
                  {{ bMana.name }}
                  <van-tag color="#FD9A16" plain class="ml-2">近一年涨幅</van-tag>
                  <van-tag color="#FD9A16" plain class="ml-2">固收配置</van-tag>
                </div>
                <div class="product-info">
                  <div class="product-rate">
                    <div class="rate-num">
                      {{ bMana.yearRate.toFixed(2) }}
                      <span class="rate-symbol">%</span>
                    </div>
                    <div class="rate-label">近一年涨幅</div>
                  </div>
                  <div class="product-detail">
                    <div class="product-risk">
                      <div class="risk-level">风险较低 可长期持有</div>
                      <div class="risk-amount">10元|中低风险</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="financing-ad">
            <div class="financing-ad-title">注册即送新人大礼包</div>
            <div class="financing-ad-subtitle">6888新人专享红包</div>
          </div>
          <div class="register-box">
            <div class="register-title">新手福利</div>
            <div class="register-items">
              <div class="register-item">
                <div class="register-item-icon">
                  <div class="register-icon"></div>
                </div>
                <div class="register-item-info">
                  <div class="register-item-value">专享抵用红包</div>
                  <div class="register-item-label">注册即送</div>
                </div>
              </div>
              <div class="register-item">
                <div class="register-item-icon">
                  <div class="money-icon"></div>
                </div>
                <div class="register-item-info">
                  <div class="register-item-value">高额历史收益</div>
                  <div class="register-item-label">收益到账</div>
                </div>
              </div>
              <div class="register-item">
                <div class="register-item-icon">
                  <div class="cert-icon"></div>
                </div>
                <div class="register-item-info">
                  <div class="register-item-value">期待您的到来</div>
                  <div class="register-item-label">实名认证</div>
                </div>
              </div>
            </div>
            <div class="register-btn" @click="navigateTo('/mine/certification')">
              <div class="cert-icon"></div>
              实名认证
            </div>
          </div>
          <div class="hot-product-box">
            <div class="hot-product-hd">
              <div class="hot-product-hd-title">热门理财产品</div>
              <div class="hot-product-hd-subtitle">大家都在买什么</div>
            </div>
            <div class="hot-product-bd">
              <div
                v-for="item in manaList"
                :key="item.id"
                class="hot-product-item"
                @click="navigateTo(`/financing/manaDetail?id=${item.id}`)"
              >
                <div class="hot-product-item-index">
                  <svg xmlns="http://www.w3.org/2000/svg" class="hot-icon" viewBox="0 0 24 24">
                    <path
                      d="M0 7.41883L0.076976 7.20554C0.274914 6.62506 0.791752 6.23628 1.42131 6.19309C1.99588 6.15259 2.57045 6.48197 2.83986 7.00035C3.11478 7.52952 3.0378 8.15319 2.63918 8.61757C2.59244 8.66886 2.5457 8.72016 2.49347 8.77956C3.60687 9.44912 4.71478 10.1106 5.81718 10.7775C6.23505 11.0312 6.65567 11.285 7.07354 11.5307C7.31271 11.6684 7.49691 11.6279 7.62612 11.3984C8.89347 9.13054 10.1608 6.85995 11.4392 4.56777C10.8866 4.29238 10.5292 3.8712 10.4962 3.24753C10.4742 2.81015 10.6309 2.43487 10.9471 2.12979C11.5739 1.53042 12.6021 1.58712 13.1519 2.25128C13.7842 3.01264 13.556 3.9036 12.5526 4.57317C12.8797 5.16174 13.2096 5.75301 13.5423 6.34158C14.4632 7.9885 15.3787 9.63001 16.2997 11.2769C16.5113 11.6576 16.646 11.6927 17.0254 11.4713C18.4495 10.6182 19.8708 9.75961 21.2948 8.90375C21.3608 8.86325 21.4241 8.82275 21.501 8.77686C21.2069 8.48797 21.0199 8.16129 20.9979 7.75901C20.9567 7.00575 21.4845 6.34698 22.2241 6.22278C22.9938 6.09049 23.7086 6.52247 23.9368 7.25413C23.9533 7.31083 23.978 7.37023 24 7.42692V7.9345C23.7581 8.69586 23.2605 9.13864 22.4055 9.14404C22.3753 9.23043 22.3423 9.31683 22.3175 9.40323C21.4845 12.2084 20.6515 15.0189 19.8186 17.8241C19.7113 18.1913 19.5794 18.2858 19.2027 18.2858H4.81649C4.41237 18.2858 4.28866 18.194 4.17869 17.8241C3.49966 15.5481 2.82887 13.264 2.14983 10.988C1.96838 10.3725 1.78144 9.75691 1.59725 9.13864C0.95945 9.13864 0.478351 8.89025 0.178694 8.35028C0.107216 8.21799 0.060481 8.06949 0.00274906 7.9291C-9.56795e-08 7.75361 0 7.58622 0 7.41883Z"
                    />
                    <path
                      d="M12.0031 20.005H18.8307C19.4395 20.005 19.9254 20.4354 19.9924 21.014C20.0594 21.5981 19.6769 22.1292 19.0876 22.2606C19.0039 22.2829 18.9145 22.2857 18.8307 22.2857H5.16997C4.65057 22.2857 4.21215 21.9755 4.06136 21.5059C3.90498 21.0363 4.05019 20.5053 4.46627 20.237C4.68129 20.1 4.96612 20.005 5.21744 20.005C7.48214 19.9938 9.74404 20.005 12.0031 20.005Z"
                    />
                  </svg>
                </div>
                <div class="hot-product-item-main">
                  <div class="hot-product-item-hd">
                    <div class="hot-product-item-title">{{ item.name }}</div>
                  </div>
                  <div class="hot-product-item-bd">
                    <div class="hot-product-item-rate">
                      <div class="rate-num">
                        {{ item.yearRate.toFixed(2) }}
                        <span>%</span>
                      </div>
                      <div class="rate-label">年化收益</div>
                    </div>
                    <div class="hot-product-item-info">
                      <div class="info-item">
                        <div class="info-value">
                          {{ item.cal === '0' ? '永久' : `${item.day}天` }}
                        </div>
                        <div class="info-label">期限</div>
                      </div>
                      <div class="info-item">
                        <div class="info-value">{{ item.minValue }}元</div>
                        <div class="info-label">最低起购</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="upgrade-box"></div>
        </div>
      </div>
      <div class="ui-content-fix">
        <Tabbar></Tabbar>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Tabbar from '@/components/scopes/Tabbar.vue'

useHead({
  title: '理财',
})
const bMana = ref<Mana.ManaData>()
const manaList = ref<Mana.ManaData[]>([])

const loadList = async () => {
  const res = await $request.get('/prod-api/home/mana/list')
  manaList.value = res.data
  bMana.value = res.data[0]
}
onMounted(() => {
  loadList()
})
</script>
<style lang="less" scoped>
.financing-main {
  min-height: 900px;
  background: url('/img/financing-top.png') no-repeat top left;
  background-size: 100% auto;
  padding-top: 220px;
}
.financing-title {
  font-size: 80px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  text-indent: 20px;
  letter-spacing: 20px;
}
.financing-subtitle {
  font-size: 32px;
  background: #fff;
  border-radius: 40px;
  text-align: center;
  width: 400px;
  margin: 12px auto 0;
  font-size: 28px;
  color: #000;
  padding: 8px 10px;
}
.best-product-box {
  margin: 48px 32px 0;
  border-radius: 20px;
  background: linear-gradient(180deg, #ee2a22 0%, rgba(238, 42, 34, 0.4) 100%);
  padding: 24px;
  .best-product-hd {
    font-size: 32px;
    color: #fff;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .best-product-bd {
    background: #fff;
    border-radius: 16px;
    padding: 28px;
  }

  .product-card {
    .product-name {
      font-size: 28px;
      font-weight: 500;
      color: #000;
      margin-bottom: 12px;
    }
    .product-info {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .product-rate {
      padding-right: 20px;
      width: 50%;
      white-space: nowrap;
      .rate-num {
        color: #ee2a22;
        font-size: 40px;
        font-weight: 600;
        line-height: 1.2;

        .rate-symbol {
          font-size: 24px;
        }
      }

      .rate-label {
        font-size: 28px;
        color: #666;
        margin-top: 4px;
      }
    }

    .product-detail {
      .product-risk {
        color: #666;
        font-size: 28px;
        .risk-level {
          color: #000;
          margin-bottom: 8px;
        }
      }
    }
  }
}
.financing-ad {
  background: url('/img/financing-ad-bg.png') no-repeat top left;
  background-size: 100% 100%;
  border-radius: 20px;
  margin: 16px 32px 0;
  height: 152px;
  .financing-ad-title {
    padding-top: 36px;
    font-size: 28px;
    color: #fff;
    font-weight: 600;
    padding-left: 180px;
  }
  .financing-ad-subtitle {
    font-size: 20px;
    color: #fff;
    padding-left: 220px;
  }
}
.hot-product-box {
  margin: 32px 32px 0;
  padding: 28px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 432px;
    border-radius: 20px;
    z-index: -1;
    background: linear-gradient(180deg, #f8f4e7 0%, #fff 100%);
  }
  .hot-product-hd {
    display: flex;
    align-items: baseline;
    .hot-product-hd-title {
      font-size: 32px;
      color: #5f4300;

      font-weight: 600;
    }
    .hot-product-hd-subtitle {
      font-size: 24px;
      color: #666;
      margin-left: 12px;
    }
  }
  .hot-product-bd {
    margin-top: 24px;
    counter-reset: hot-product-counter;

    .hot-product-item {
      margin-bottom: 20px;
      display: flex;
      position: relative;
      &:nth-child(1) {
        .hot-icon {
          fill: #f54444;
        }
      }
      &:nth-child(2) {
        .hot-icon {
          fill: #d69203;
        }
      }
      &:nth-child(3) {
        .hot-icon {
          fill: #ffba00;
        }
      }
      .hot-icon {
        width: 48px;
        height: 48px;
        fill: #cccbce;
        margin-right: 20px;
      }
      .hot-product-item-index {
        text-align: center;
        &::before {
          display: block;
          counter-increment: hot-product-counter;
          content: counter(hot-product-counter);
          position: absolute;
          width: 48px;
          text-align: center;
          top: 10px;
          left: 0;
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          z-index: 1;
        }
      }
      .hot-product-item-main {
        flex: 1;
        padding: 20px;
        background: #fff;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
        border-radius: 20px;
      }
      .hot-product-item-hd {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
      }

      .hot-product-item-title {
        font-size: 28px;
        color: #000;
        font-weight: 500;
        flex: 1;
      }

      .hot-product-item-bd {
        display: flex;
        align-items: center;
      }

      .hot-product-item-rate {
        width: 33%;
        white-space: nowrap;

        .rate-num {
          color: #ee2a22;
          font-size: 40px;
          font-weight: 600;
          line-height: 1.2;

          span {
            font-size: 24px;
          }
        }

        .rate-label {
          font-size: 24px;
          color: #666;
          margin-top: 4px;
        }
      }

      .hot-product-item-info {
        flex: 1;
        display: flex;
        gap: 32px;

        .info-item {
          flex: 1;
          text-align: center;

          .info-value {
            font-size: 24px;
            color: #666;
            font-weight: 500;
            margin-top: 8px;
          }

          .info-label {
            font-size: 24px;
            color: #666;
            margin-top: 8px;
          }
        }
      }
    }
  }
}
.upgrade-box {
  margin: 0 32px 32px;
  height: 488px;
  background: url('/img/financing-upgrade-box.png') no-repeat top left;
  background-size: 100% 100%;
}
.register-box {
  margin: 32px;
  padding: 32px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);

  .register-title {
    font-size: 32px;
    font-weight: 600;
    color: #000;
    margin-bottom: 32px;
    text-align: center;
  }

  .register-items {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .register-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .register-item-icon {
      width: 80px;
      height: 80px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: #f9f9f9;
      .register-icon {
        width: 36px;
        height: 36px;
        background: url('/img/financing-register.png') no-repeat top left;
        background-size: 100% 100%;
      }
      .money-icon {
        width: 36px;
        height: 36px;
        background: url('/img/financing-money.png') no-repeat top left;
        background-size: 100% 100%;
      }
      .cert-icon {
        width: 36px;
        height: 36px;
        background: url('/img/financing-cert.png') no-repeat top left;
        background-size: 100% 100%;
      }
    }

    .register-item-info {
      .register-item-value {
        font-size: 24px;
        font-weight: 500;
        color: #000;
        margin-bottom: 4px;
      }

      .register-item-label {
        font-size: 24px;
        color: #666;
      }
    }
  }

  .register-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 auto;
    height: 60px;
    border-radius: 40px;
    width: 184px;
    border: 2px solid #000;
    font-size: 28px;
    .cert-icon {
      width: 24px;
      height: 24px;
      background: url('/img/financing-cert.png') no-repeat top left;
      background-size: 100% 100%;
      margin-right: 8px;
    }
  }
}
</style>
