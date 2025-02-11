<template>
  <div class="ui-page">
    <div class="ui-content">
      <div v-if="status === 'success'" class="news">
        <div class="title">{{ data.news.title }}</div>
        <div class="where">
          <div class="source">{{ data.news.source }}</div>
          <div class="time">{{ data.news.showtime }}</div>
        </div>
        <div class="content" v-html="newsContent"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { data, status } = useAsyncData<any>(() => $request(`/prod-api/home/zixun/info/${route.params.id}`))
function replaceImageMarkers(str, images) {
  const regex = /<!--IMG#(\d+)-->/g
  return str.replace(regex, (match, index) => {
    const img = images[parseInt(index, 10)]
    return img && !img.code && img.class !== 'em_handle_adv_close' ? `<img src="${img.src}">` : ''
  })
}
function replaceHref(str) {
  return str.replace(/href="[^"]*"/g, '')
}
const newsContent = computed(() => {
  if (!data.value) {
    return
  }
  return replaceHref(replaceImageMarkers(data.value.news.body, data.value.news.images))
})
</script>
<style scoped lang="less">
.news {
  padding: 32px;
  .title {
    font-size: 48px;
    font-weight: 700;
  }
  :deep(.content) {
    padding-top: 32px;
    font-size: 32px;
    line-height: 2;

    .em_media {
      display: none;
    }
    p {
      margin-bottom: 28px;
    }
  }
  .where {
    display: flex;
    justify-content: space-between;
    color: #999;
    margin-top: 32px;
  }
}
</style>
