<template>
  <div class="ui-root">
    <NuxtPage :transition="false" />
  </div>
</template>
<script setup lang="ts">
useHead({
  script: [
    {
      src: '/js/flexible.js',
      'data-design-width': '1920',
      'data-max-width': '1920',
    },
  ],
})
</script>

<style lang="less">
@import '@/assets/css/site.less';

.default-enter-active,
.default-leave-active {
  transition: all 0.4s;
}
.default-enter-from,
.default-leave-to {
  opacity: 0;
  filter: blur(100px);
  transform: rotate3d(1, 1, 1, 15deg);
}

// 区分前进后退，需移除全局NuxtPage上的transition
.forward-enter-active,
.forward-leave-active,
.back-enter-active,
.back-leave-active {
  transition: all 0.2s;
}
.forward-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.forward-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.back-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.back-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
.gradient-text {
  display: inline;
  background: linear-gradient(30deg, #f83a3a 10%, #f13dd4 50%, #7000ff 90%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>
