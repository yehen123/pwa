<template>
  <div class="ui-root">
    <NuxtPage v-if="appStore.show" :keepalive="{ include: include }" />
  </div>
</template>
<script setup lang="ts">
import { useKaCtrl } from '@/composables/useKaCtrl'
const { include } = useKaCtrl()
const appStore = useAppStore()

useHead({
  script: [
    {
      src: '/js/flexible.js',
      'data-design-width': '750',
      'data-max-width': '450',
    },
  ],
  style: [
    `
        @media screen and (min-width: 450px) {
          .ui-root.ui-root {
            top: 5vh;
            height: 90vh;
            border: 8px solid #333;
            border-radius: 8px;
            max-width: 450px;
          }
        }
        `,
  ],
})
</script>

<style lang="less">
@import '@/assets/css/default.less';
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
</style>
