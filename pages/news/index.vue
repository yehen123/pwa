<template>
  <div class="ui-page">
    <div class="ui-content ui-content-auto-scroll">
      <div class="ui-content-fix">
        <div class="news-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="news-back"
            viewBox="0 0 20 16"
            fill="none"
            @click="router.back()"
          >
            <path
              d="M7.37853 0.280152C7.73549 -0.0793356 8.31439 -0.0948204 8.69031 0.245059C9.06621 0.584932 9.10512 1.159 8.77847 1.54588L8.72354 1.6061L2.28644 8.05187L8.71786 14.3908C9.06662 14.7346 9.09295 15.2863 8.77847 15.6613L8.72354 15.722C8.37741 16.0683 7.82216 16.0943 7.44483 15.7817L7.38375 15.7271L0.279833 8.72567C-0.0687862 8.38178 -0.0949172 7.83014 0.21969 7.45525L0.274622 7.39455L7.37853 0.280152Z"
              fill="black"
            />
            <rect x="2" y="7" width="18" height="2" rx="1" fill="black" />
          </svg>
          <div class="news-title">新闻资讯</div>
        </div>
        <div class="news-tabs">
          <div
            class="news-tab-item"
            :class="{ active: route.query.type === 'flash' }"
            @click="router.replace('/news?type=flash')"
          >
            快讯
          </div>
          <div
            class="news-tab-item"
            :class="{ active: route.query.type === 'important' }"
            @click="router.replace('/news?type=important')"
          >
            资讯
          </div>
        </div>
      </div>
      <div class="ui-content-auto">
        <div v-if="route.query.type === 'flash'" class="timeline">
          <div class="news-date">今天，{{ $dayjs().format('MM月DD日 dddd') }}</div>
          <div class="news-list">
            <div v-for="(item, index) in flashNewsList" :key="index" class="news-item">
              <div class="news-item-time">{{ $dayjs(item.showtime).format('HH:mm') }}</div>
              <div class="news-item-content">
                <div class="news-item-title">{{ item.digest }}</div>
                <div class="news-item-actions">
                  <div class="news-item-action">
                    <van-icon name="good-job-o" />
                    <span>{{ fakeLike(item) }}</span>
                  </div>
                  <div class="news-item-action">
                    <van-icon name="chat-o" />
                    <span>{{ item.commentnum }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="route.query.type === 'important'" class="report">
          <div class="report-list">
            <div
              v-for="(item, index) in importantNewsList"
              :key="index"
              class="report-item"
              @click="navigateTo(`/news/${item.code}`)"
            >
              <div class="report-item-content">
                <div class="report-item-title">
                  {{ item.title }}
                </div>
                <div class="report-item-tags">
                  <div v-if="index === 0" class="report-item-tag report-item-tag-pos">置顶</div>
                  <div class="report-item-tag report-item-tag-type">精选</div>
                  <div class="report-item-tag report-item-tag-source">
                    {{ item.mediaName }}
                  </div>
                </div>
                <div class="report-item-time">{{ item.showTime }}</div>
              </div>
              <div class="report-item-image">
                <van-image :src="item.image" alt="" width="100%" height="100%">
                  <template #error></template>
                </van-image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFlashNews, getImportantNews } from '@/service/news'
useHead({
  title: '研报精选',
})
const route = useRoute()
const router = useRouter()
const flashNewsList = ref<Array<any>>([])
const importantNewsList = ref<Array<any>>([])
const loadFlashNews = async () => {
  const res = await getFlashNews()
  flashNewsList.value = res
}
const loadImportantNews = async () => {
  const res = await getImportantNews()
  importantNewsList.value = res
}
const fakeLike = (item: any) => {
  let num = item.id.slice(-1)
  num = (num % 3) + 1
  return item.sort.slice(-1 * num)
}
onMounted(async () => {
  loadFlashNews()
  loadImportantNews()
})
</script>

<style lang="less" scoped>
.news-header {
  height: 88px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: #fff;
  position: relative;

  .news-back {
    position: absolute;
    left: 32px;
    width: 40px;
    height: 32px;
  }

  .news-title {
    flex: 1;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: #000;
  }
}

.news-tabs {
  height: 88px;
  display: flex;
  align-items: center;
  background: #fff;
  padding: 0 32px;
  gap: 48px;

  .news-tab-item {
    font-size: 32px;
    color: #666;
    position: relative;
    padding: 20px 0;

    &.active {
      color: #f54444;
      font-weight: bold;
    }
  }
}

.timeline {
  margin-left: 48px;
  border-left: 1px dashed #666;
  .news-date {
    padding-left: 32px;
    position: relative;
    font-size: 28px;
    font-weight: 500;
    &::before {
      content: '';
      position: absolute;
      left: -16px;
      top: 0;
      width: 32px;
      height: 32px;
      background: #fff;
      border: 10px solid #000;
      border-radius: 50%;
    }
  }
  .news-item {
    padding: 32px;

    &:last-child {
      border-bottom: none;
    }

    .news-item-time {
      font-size: 24px;
      color: #666;
      margin-right: 24px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: -40px;
        top: 10px;
        width: 16px;
        height: 16px;
        background: #666;
        border-radius: 50%;
        transform: translateX(-1px);
      }
    }

    .news-item-content {
      flex: 1;
    }

    .news-item-title {
      font-size: 28px;
      color: #000;
      margin-bottom: 16px;
      font-size: 28px;
    }

    .news-item-actions {
      display: flex;
      gap: 32px;
      justify-content: flex-end;
    }

    .news-item-action {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 24px;
      color: #999;

      .van-icon {
        font-size: 28px;
      }
    }
  }
}

.report {
  padding: 32px;
  background: #fff;

  .report-list {
    .report-item {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      padding: 24px 0;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        padding-top: 0;
      }
    }

    .report-item-content {
      flex: 1;
    }

    .report-item-title {
      font-size: 28px;
      font-weight: 500;
      color: #000;
      margin-bottom: 24px;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .report-item-tags {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .report-item-time {
      padding-top: 8px;
      font-size: 24px;
      color: #666;
    }
    .report-item-tag {
      font-size: 20px;
      color: #666;
      padding: 4px 12px;
      border-radius: 8px;
      &.report-item-tag-pos {
        color: #f54444;
        background: #ffdada;
      }

      &.report-item-tag-type {
        color: #6490f3;
        background: #e7efff;
      }

      &.report-item-tag-source {
        color: #666;
        padding: 4px 0;
      }
    }

    .report-item-image {
      width: 200px;
      height: 150px;
      border-radius: 12px;
      overflow: hidden;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
