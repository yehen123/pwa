<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
      <div class="ui-content-auto">
        <div class="top-actions">
          <div class="top-actions-item" @click="navigateTo('/mine/setting')">
            <van-icon name="setting-o" class="block" />
          </div>
          <div class="top-actions-item">
            <van-icon name="service-o" class="block" />
          </div>
        </div>
        <div class="top-user">
          <div class="top-user-info">
            <van-image class="top-user-avatar" :showLoading="false" src="/img/default-avatar.png" round />
            <div class="uinfo-right">
              <div class="top-user-info-name" @click="navigateTo('/mine/setting')">
                {{ userStore.userInfo.userName }}
              </div>

              <div class="top-user-info-id">推荐码：{{ userStore.userInfo.userCode }}</div>
            </div>
          </div>
          <div class="top-user-share" @click="navigateTo('/inviteCode')">
            <img src="/img/qrcode-icon.png" alt="" />
            <span>分享二维码</span>
          </div>
        </div>

        <AssetCard type="total" class="mx-8"></AssetCard>
        <div class="hot-recommend">
          <div class="hot-recommend-header">
            <div class="hot-recommend-title">热门推荐</div>
            <div class="hot-recommend-more">
              更多咨询
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="hot-recommend-grid">
            <div class="hot-recommend-item" @click="navigateTo('/market')">
              <div class="hot-recommend-item-icon"></div>
              <div class="hot-recommend-item-title">交易</div>
            </div>
            <div class="hot-recommend-item" @click="navigateTo('/mine/myTeam')">
              <div class="hot-recommend-item-icon"></div>
              <div class="hot-recommend-item-title">团队</div>
            </div>
            <div class="hot-recommend-item" @click="navigateTo('/recharge')">
              <div class="hot-recommend-item-icon"></div>
              <div class="hot-recommend-item-title">充值</div>
            </div>
            <div class="hot-recommend-item" @click="navigateToWithdraw">
              <div class="hot-recommend-item-icon"></div>
              <div class="hot-recommend-item-title">提现</div>
            </div>
            <div class="hot-recommend-item">
              <div class="hot-recommend-item-icon"></div>
              <div class="hot-recommend-item-title">跟投</div>
            </div>
          </div>
        </div>
        <div class="register-ad">
          <img src="/img/register-ad.png" alt="" />
        </div>
        <div class="activity">
          <div class="activity-header">
            <div class="activity-title">常用功能</div>
            <div class="activity-more">
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="activity-grid">
            <div class="activity-item">
              <div class="activity-item-content" @click="navigateTo('/mine/certification')">
                <div class="activity-item-title">开户认证</div>
                <div class="activity-item-desc">立即赚取收益</div>
              </div>
              <div class="activity-item-icon"></div>
            </div>
            <div class="activity-item">
              <div class="activity-item-content" @click="navigateTo('/financing')">
                <div class="activity-item-title">理财中心</div>
                <div class="activity-item-desc">领取专属好礼</div>
              </div>
              <div class="activity-item-icon"></div>
            </div>
          </div>
        </div>
        <div class="my-service">
          <div class="my-service-header">
            <div class="my-service-title">我的服务</div>
          </div>
          <div class="my-service-grid">
            <a
              class="my-service-item"
              href="https://iyctuzeo.yyboggzvtacgjom.top/index?key=09349234dd5b9b7d34c05ddb537094f3"
              target="_blank"
            >
              <div class="my-service-item-icon"></div>
              <div class="my-service-item-title">帮助中心</div>
            </a>
            <div class="my-service-item" @click="navigateTo('/rechargeRecord')">
              <div class="my-service-item-icon"></div>
              <div class="my-service-item-title">充值明细</div>
            </div>
            <div class="my-service-item" @click="navigateTo('/withdrawRecord')">
              <div class="my-service-item-icon"></div>
              <div class="my-service-item-title">提现明细</div>
            </div>
            <div class="my-service-item" @click="navigateTo('./mine/bindCB')">
              <div class="my-service-item-icon"></div>
              <div class="my-service-item-title">CBPAY绑定</div>
            </div>
            <div class="my-service-item" @click="navigateTo('./mine/bindU')">
              <div class="my-service-item-icon"></div>
              <div class="my-service-item-title">USDT绑定</div>
            </div>
            <div class="my-service-item" @click="navigateTo('/mine/myTeam')">
              <div class="my-service-item-icon"></div>
              <div class="my-service-item-title">我的团队</div>
            </div>
            <div class="my-service-item" @click="navigateTo('/trade?type=0')">
              <div class="my-service-item-icon"></div>
              <div class="my-service-item-title">我的合约</div>
            </div>
            <div class="my-service-item" @click="navigateTo('/trade?type=1')">
              <div class="my-service-item-icon"></div>
              <div class="my-service-item-title">我的理财</div>
            </div>
          </div>
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
import AssetCard from '@/components/scopes/AssetCard.vue'
useHead({
  title: '资产',
})
const userStore = useUserStore()
const isCertification = computed(() => {
  return userStore.userInfo.iauth === '1'
})
const navigateToWithdraw = async () => {
  if (isCertification.value) {
    navigateTo('/withdraw')
  } else {
    await $confirm('系统提示', '请先进行开户认证', { confirmButtonText: '去认证' })
    navigateTo('/mine/certification')
  }
}
onMounted(() => {
  userStore.updateUserInfo()
})
</script>
<style lang="less" scoped>
.top-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 28px 32px 0;

  gap: 32px;
  .top-actions-item {
    width: 44px;
    height: 44px;
    font-size: 44px;
  }
}
.top-user {
  display: flex;
  align-items: center;
  padding: 26px 32px;
  .top-user-avatar {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .top-user-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;
    .top-user-info-name {
      font-size: 32px;
      font-weight: 600;
      color: #000;
    }
    .top-user-info-id {
      font-size: 24px;
      color: #666;
    }
  }
  .top-user-share {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    > img {
      width: 60px;
      height: 60px;
    }
    > span {
      font-size: 20px;
      color: #666;
    }
  }
}
.hot-recommend {
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  margin: 32px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
  .hot-recommend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    .hot-recommend-title {
      font-size: 32px;
      font-weight: bold;
      color: #000;
    }

    .hot-recommend-more {
      font-size: 24px;
      color: #999;
    }
  }

  .hot-recommend-grid {
    display: flex;
    justify-content: space-between;
  }

  .hot-recommend-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .hot-recommend-item-icon {
      width: 64px;
      height: 64px;
      background-size: 100% 100%;
    }

    &:nth-child(1) .hot-recommend-item-icon {
      background-image: url('/img/hot-trade.png');
    }
    &:nth-child(2) .hot-recommend-item-icon {
      background-image: url('/img/hot-exchange.png');
    }
    &:nth-child(3) .hot-recommend-item-icon {
      background-image: url('/img/hot-recharge.png');
    }
    &:nth-child(4) .hot-recommend-item-icon {
      background-image: url('/img/hot-withdraw.png');
    }
    &:nth-child(5) .hot-recommend-item-icon {
      background-image: url('/img/hot-follow.png');
    }

    .hot-recommend-item-title {
      font-size: 24px;
      color: #333;
    }
  }
}
.register-ad {
  margin: 32px;
}
.activity {
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  margin: 32px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);

  .activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .activity-title {
      font-size: 32px;
      font-weight: bold;
      color: #000;
    }

    .activity-more {
      font-size: 24px;
      color: #999;
    }
  }

  .activity-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .activity-item {
    background: #f8f8f8;
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;

    .activity-item-content {
      .activity-item-title {
        font-size: 32px;
        color: #333;
      }

      .activity-item-desc {
        font-size: 24px;
        color: #999;
      }
    }

    .activity-item-icon {
      position: absolute;
      right: 24px;
      top: 50%;
      transform: translateY(-50%);
      width: 64px;
      height: 64px;
      background-size: 100% 100%;
    }

    &:nth-child(1) .activity-item-icon {
      background-image: url('/img/activity-new.png');
    }
    &:nth-child(2) .activity-item-icon {
      background-image: url('/img/activity-invite.png');
    }
  }
}
.my-service {
  background: #fff;
  border-radius: 24px;
  padding: 28px;
  margin: 32px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);

  .my-service-header {
    margin-bottom: 32px;

    .my-service-title {
      font-size: 32px;
      font-weight: bold;
      color: #000;
    }
  }

  .my-service-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px 0;
  }

  .my-service-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .my-service-item-icon {
      width: 64px;
      height: 64px;
      background-size: 100% 100%;
    }

    &:nth-child(1) .my-service-item-icon {
      background-image: url('/img/service-help.png');
    }
    &:nth-child(2) .my-service-item-icon {
      background-image: url('/img/service-remind.png');
    }
    &:nth-child(3) .my-service-item-icon {
      background-image: url('/img/service-ai.png');
    }
    &:nth-child(4) .my-service-item-icon {
      background-image: url('/img/service-u.png');
    }
    &:nth-child(5) .my-service-item-icon {
      background-image: url('/img/service-cb.png');
    }
    &:nth-child(6) .my-service-item-icon {
      background-image: url('/img/service-stock.png');
    }
    &:nth-child(7) .my-service-item-icon {
      background-image: url('/img/service-calendar.png');
    }
    &:nth-child(8) .my-service-item-icon {
      background-image: url('/img/service-suggest.png');
    }

    .my-service-item-title {
      font-size: 24px;
      color: #333;
    }
  }
}
</style>
