<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
      <div class="ui-content-fix">
        <div class="home-top">
          <div class="home-top-bar">
            <div class="home-top-bar-left">
              <van-image class="avatar" :showLoading="false" src="/img/default-avatar.png" round />
            </div>
            <div class="home-top-bar-search" @click="navigateTo('/market/search')">
              <van-icon name="search" />
              <span>点击搜索</span>
            </div>
            <a
              class="home-top-bar-right"
              href="https://iyctuzeo.yyboggzvtacgjom.top/index?key=09349234dd5b9b7d34c05ddb537094f3"
              target="_blank"
            >
              <van-icon name="service-o" />
            </a>
          </div>
          <div class="home-top-nav">
            <div class="home-top-nav-item" @click="navigateTo('/mine/certification')">
              <div class="home-top-nav-item-icon"></div>
              <div class="home-top-nav-item-title">
                <span>立即开户</span>
              </div>
            </div>
            <div class="home-top-nav-item" @click="navigateTo('/financing')">
              <div class="home-top-nav-item-icon"></div>
              <div class="home-top-nav-item-title">
                <span>理财中心</span>
              </div>
            </div>
            <div class="home-top-nav-item" @click="navigateTo('/market')">
              <div class="home-top-nav-item-icon"></div>
              <div class="home-top-nav-item-title">
                <span>交易中心</span>
              </div>
            </div>
            <div class="home-top-nav-item" @click="navigateTo('/recharge')">
              <div class="home-top-nav-item-icon"></div>
              <div class="home-top-nav-item-title">
                <span>充值中心</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div class="home-grid">
          <div class="home-grid-item" @click="navigateTo('/mine/myTeam')">
            <div class="home-grid-item-icon"></div>
            <div class="home-grid-item-title">
              <span>团队中心</span>
            </div>
          </div>
          <div class="home-grid-item" @click="navigateTo('/trade?type=1')">
            <div class="home-grid-item-icon"></div>
            <div class="home-grid-item-title">
              <span>理财结算</span>
            </div>
          </div>
          <div class="home-grid-item" @click="navigateTo('/fundsDetail')">
            <div class="home-grid-item-icon"></div>
            <div class="home-grid-item-title">
              <span>资金中心</span>
            </div>
          </div>
          <div class="home-grid-item" @click="navigateTo('/mine/setting')">
            <div class="home-grid-item-icon"></div>
            <div class="home-grid-item-title">
              <span>安全中心</span>
            </div>
          </div>
          <div class="home-grid-item" @click="navigateTo('/mine')">
            <div class="home-grid-item-icon"></div>
            <div class="home-grid-item-title">
              <span>更多功能</span>
            </div>
          </div>
        </div>
        <div class="home-register-banner">
          <img src="/img/register-ad.png" alt="" />
        </div>
        <div v-if="futuresList.length > 0" class="home-index">
          <div class="home-index-hd">
            <div
              v-for="item in futuresList"
              :key="item.code"
              class="home-index-item"
              :class="item.changeRate >= 0 ? 'raise' : 'fall'"
              @click="navigateTo(`/market/futuresDetail?id=${item.id}`)"
            >
              <div class="home-index-item-title">{{ item.name }}</div>
              <div class="home-index-item-price">
                {{ item.price }}
              </div>
              <div class="home-index-item-change">
                <span>
                  {{
                    item.changeRate === null
                      ? ''
                      : item.changeRate >= 0
                        ? `+${item.changeRate}%`
                        : `${item.changeRate}%`
                  }}
                </span>
                <span>{{ item.change }}</span>
              </div>
            </div>
          </div>
          <div class="home-index-bd">
            <img src="/img/home-index-img.png" alt="" />
          </div>
        </div>
        <div class="home-news">
          <div class="home-news-header">
            <div class="home-news-title">快讯速览</div>
            <div class="home-news-more" @click="navigateTo('/news?type=flash')">
              更多快讯
              <van-icon name="arrow" />
            </div>
          </div>
          <div class="home-news-list">
            <div v-for="(item, index) in flashNewsList" :key="item.id" class="home-news-item">
              <span class="home-news-item-index">{{ index + 1 }}</span>
              <span class="home-news-item-title">{{ item.title }}</span>
            </div>
          </div>
        </div>
        <div class="home-report">
          <div class="home-report-header">
            <div class="flex">
              <div class="home-report-title">资讯精选</div>
              <div class="home-report-more" @click="navigateTo('/news?type=important')">
                更多资讯
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="home-report-subtitle">科技前沿、国家战略、精选热门概念</div>
          </div>

          <div class="home-report-list">
            <div
              v-for="item in importantNewsList"
              :key="item.id"
              class="home-report-item"
              @click="navigateTo(`/news/${item.code}`)"
            >
              <div class="home-report-item-content">
                <div class="home-report-item-title">{{ item.title }}</div>
                <div class="home-report-item-time">{{ item.showTime }}</div>
              </div>
              <div class="home-report-item-image">
                <van-image :src="item.image" alt="" width="100%" height="100%">
                  <template #error></template>
                </van-image>
              </div>
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
import { getHomeFuturesList } from '@/service/futures'
import { getFlashNews, getImportantNews } from '@/service/news'
useHead({
  title: '首页',
})
const userStore = useUserStore()
const futuresList = ref<Array<Futures.FuturesData>>([])
const flashNewsList = ref<Array<any>>([])
const importantNewsList = ref<Array<any>>([])
const loadFlashNews = async () => {
  const res = await getFlashNews()
  flashNewsList.value = res.slice(0, 5)
}
const loadImportantNews = async () => {
  const res = await getImportantNews()
  importantNewsList.value = res.slice(0, 3)
}
onMounted(async () => {
  if (userStore.auth.accessToken) {
    futuresList.value = await getHomeFuturesList()
  }
  loadFlashNews()
  loadImportantNews()
})
</script>
<style lang="less" scoped>
.home-top {
  height: 300px;
  background: url('/img/home-top-bg.jpg') no-repeat center center;
  background-size: cover;
  .home-top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 28px 32px 0;

    gap: 24px;
    .home-top-bar-left {
      height: 60px;
      .avatar {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .home-top-bar-search {
      flex: 1;
      height: 60px;
      background: #fff;
      border-radius: 30px;
      display: flex;
      align-items: center;
      color: #bfc0c2;
      padding: 0 24px;
      .van-icon {
        font-size: 32px;
      }
      span {
        font-size: 24px;
        margin-left: 8px;
      }
    }
    .home-top-bar-right {
      .van-icon {
        font-size: 44px;
        color: #fff;
      }
    }
  }
  .home-top-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding: 0 24px;
    margin-top: 48px;
    .home-top-nav-item {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:nth-child(1) {
        .home-top-nav-item-icon {
          background: url('/img/home-top-icon-1.png') no-repeat center center;
          background-size: 100% 100%;
        }
      }
      &:nth-child(2) {
        .home-top-nav-item-icon {
          background: url('/img/home-top-icon-2.png') no-repeat center center;
          background-size: 100% 100%;
        }
      }
      &:nth-child(3) {
        .home-top-nav-item-icon {
          background: url('/img/home-top-icon-3.png') no-repeat center center;
          background-size: 100% 100%;
        }
      }
      &:nth-child(4) {
        .home-top-nav-item-icon {
          background: url('/img/home-top-icon-4.png') no-repeat center center;
          background-size: 100% 100%;
        }
      }
      .home-top-nav-item-icon {
        width: 64px;
        height: 64px;
        background: #fff;
      }
      .home-top-nav-item-title {
        font-size: 24px;
        color: #fff;
        margin-top: 20px;
      }
    }
  }
}
.home-grid {
  padding: 32px 32px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-between;
  gap: 32px 24px;
  .home-grid-item {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &:nth-child(1) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-1.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(2) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-2.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(3) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-3.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(4) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-4.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(5) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-5.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(6) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-6.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(7) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-7.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(8) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-8.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(9) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-9.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    &:nth-child(10) {
      .home-grid-item-icon {
        background: url('/img/home-grid-icon-10.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .home-grid-item-icon {
      width: 64px;
      height: 64px;
    }
    .home-grid-item-title {
      font-size: 24px;
      margin-top: 20px;
    }
  }
}
.home-register-banner {
  height: 156px;
  background: url('/img/register-ad.png') no-repeat center center;
  background-size: 100% 100%;
  margin: 32px 32px 0;
}
.home-index {
  margin: 32px 32px 0;
  background: #fff;
  border-radius: 20px;
  padding: 28px 28px 14px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);

  .home-index-hd {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    .home-index-item {
      flex: 1;
      text-align: center;

      .home-index-item-title {
        font-size: 20px;
        color: #333;
        margin-bottom: 8px;
      }

      .home-index-item-price {
        font-size: 40px;
        font-weight: bold;

        &.up {
          color: #f5222d;
        }
        &.down {
          color: #52c41a;
        }
      }

      .home-index-item-change {
        display: flex;
        justify-content: center;
        gap: 12px;
        font-size: 20px;

        &.up {
          color: #f5222d;
        }
        &.down {
          color: #52c41a;
        }
      }
    }
  }
}
.home-news {
  margin: 32px 32px 0;
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);

  .home-news-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .home-news-title {
      font-size: 32px;
      font-weight: bold;
      color: #000;
    }

    .home-news-more {
      font-size: 24px;
      color: #666;
    }
  }

  .home-news-item {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .home-news-item-index {
      font-size: 28px;
      font-weight: bold;
      color: #cccbce;
    }
    &:nth-child(1) {
      .home-news-item-index {
        color: #f54444;
      }
    }
    &:nth-child(2) {
      .home-news-item-index {
        color: #d69203;
      }
    }
    &:nth-child(3) {
      .home-news-item-index {
        color: #ffba00;
      }
    }
    .home-news-item-title {
      font-size: 26px;
      color: #000;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.home-report {
  margin: 32px 32px 32px;
  background: #fff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);

  .home-report-header {
    margin-bottom: 24px;
    position: relative;

    .home-report-title {
      font-size: 32px;
      font-weight: bold;
      color: #000;
    }

    .home-report-subtitle {
      font-size: 24px;
      color: #666;
    }

    .home-report-more {
      font-size: 24px;
      color: #666;
      position: absolute;
      right: 0;
    }
  }

  .home-report-item {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .home-report-item-content {
      flex: 1;

      .home-report-item-title {
        font-size: 28px;
        color: #000;
        margin-bottom: 16px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .home-report-item-time {
        font-size: 24px;
        color: #999;
      }
    }

    .home-report-item-image {
      width: 160px;
      height: 120px;
      border-radius: 12px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
