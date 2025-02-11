<template>
  <template v-if="isMobile">
    <VitePwaManifest />
  </template>
  <NuxtLoadingIndicator />
  <NuxtLayout></NuxtLayout>
  <van-config-provider :theme="theme"></van-config-provider>
</template>
<script setup lang="ts">
import 'vue-loading-overlay/dist/css/index.css'
import 'vant/lib/index.css'
import 'hqchart/src/jscommon/umychart.resource/css/tools.css'
import 'hqchart/src/jscommon/umychart.resource/font/iconfont.css'
import '@/assets/css/nprogress.less'
import '@/assets/css/index.less'
const theme = ref('light')
const config = useRuntimeConfig()
if (config.public.theme === 'dark') {
  theme.value = 'dark'
}

const isMobile = ref(false)

onMounted(() => {
  const userAgent = navigator.userAgent
  if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
})
</script>
