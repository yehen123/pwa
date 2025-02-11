<template>
  <div class="page">
    <AppSiteNav />
    <div class="banner">
      <img class="bg1" src="/site/img/news_bg1.png" alt="" />
      <div class="text1 gradient-text">全球市场动态，一手掌握</div>
      <div class="text2 gradient-text">
        汇聚最新期货市场资讯、专业投资分析与行业动态，帮助您精准洞察市场趋势，做出更明智的投资决策
      </div>
    </div>
    <div>
      <SiteButton>了解更多</SiteButton>
    </div>
    <div class="content">
      <div class="part1">
        <div
          v-for="(item, index) in importantNewsList.slice(0, 2)"
          :key="index"
          class="wrapper cursor-pointer"
          @click="navigateTo(`/site/news/${item.code}`)"
        >
          <div class="title gradient-text">{{ item.title }}</div>
          <div class="sub-title">
            <div>发布者: {{ item.mediaName }}</div>
            <!-- <div>浏览次数: {{ item.view }}</div> -->
          </div>
          <div class="detail">{{ item.summary }}</div>
          <div class="img"><img :src="item.image" alt="" /></div>
          <div class="date">{{ item.showTime.substring(0, 10) }}</div>
        </div>
      </div>
      <div class="part2">
        <div class="title gradient-text">更多动态</div>
        <div class="sub-title">More Dynamics</div>
        <div class="wrapper">
          <a
            v-for="(item, index) in importantNewsList.slice(3, 7)"
            :key="index"
            class="news-link cursor-pointer"
            @click="navigateTo(`/site/news/${item.code}`)"
          >
            <div class="news-title">{{ item.title }}</div>
            <div class="news-date">{{ item.showTime.substring(0, 10) }}</div>
          </a>
        </div>
        <!-- <div class="img"><img src="/site/img/index_gridbg3.png" alt="" /></div> -->
      </div>
    </div>
    <AppSiteFooter />
  </div>
</template>
<script setup lang="ts">
import SiteButton from '@/components/scopes/SiteButton.vue'
import { getImportantNews } from '@/service/news'
type NewsData = {
  code: number
  image: string
  mediaName: string
  np_dst: string
  showTime: string
  summary: string
  title: string
  uniqueUrl: string
  url: string
}

const importantNewsList = ref<NewsData[]>([])

onMounted(async () => {
  importantNewsList.value = await getImportantNews()
})
</script>
<style scoped lang="less">
.page {
  background-color: #05010d;
  color: #fff;
  .banner {
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bg1 {
      width: 1440px;
      margin: 0 auto;
    }
    .text1 {
      display: block;
      margin: -180px 0 38px;
      font-size: 64px;
    }
    .text2 {
      font-size: 28px;
    }
  }
  .site-button {
    display: block;
    width: 166px;
    height: 54px;
    font-size: 22px;
    margin: 120px auto 138px;
  }
  .content {
    width: 1200px;
    display: flex;
    justify-content: center;
    margin: 136px auto 191px;
    .part1 {
      width: 820px;
      margin-top: -34px;
      .wrapper {
        padding-top: 34px;
        padding-right: 40px;
        &:not(:last-child) {
          border-bottom: solid 1px rgba(255, 255, 255, 0.2);
        }
      }
      .title {
        font-size: 36px;
      }
      .sub-title {
        margin: 30px 0;
        color: #bcbcbc;
        display: flex;
        gap: 20px;
      }
      .detail {
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 30px;
      }
      .img {
        width: 780px;
        height: 400px;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 30px;
        img {
          width: 100%;
          object-fit: fill;
          height: 100%;
        }
      }
      .date {
        color: #bcbcbc;
        font-size: 20px;
        margin-bottom: 34px;
      }
    }
    .part2 {
      padding-left: 27px;
      margin-bottom: 90px;
      flex-grow: 1;
      border-left: solid 1px rgba(255, 255, 255, 0.2);
      .title {
        font-size: 30px;
      }
      .sub-title {
        display: inline-block;
        font-size: 20px;
        margin-left: 12px;
        color: #bcbcbc;
      }
      .wrapper {
        margin-top: 30px;
      }
      .news-title {
        width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .news-link {
        width: 300px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        .news-date {
          color: #bcbcbc;
        }
      }
      .img {
        width: 353px;
        height: 165px;
        overflow: hidden;
        border-radius: 10px;
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
