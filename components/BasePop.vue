<template>
  <Teleport :to="props.getContainer()">
    <div v-if="visible" class="basePop">
      <RenderJsx :jsx="props.content"></RenderJsx>
    </div>
  </Teleport>
</template>
<script setup>
import { render } from 'vue'
const visible = ref(true)
const props = defineProps({
  getContainer: {
    type: Function,
    default: () => document.body,
  },
  content: {
    type: [Object, String],
    required: false,
  },
  destroyOnRouteChange: {
    type: Boolean,
    default: false,
  },
})
let mountParentNode
onMounted(() => {
  if (!document.body.classList.contains('pop-show')) {
    document.body.classList.add('pop-show')
  }
  mountParentNode = getCurrentInstance().ctx.$el.parentNode
})
onUnmounted(() => {
  document.body.classList.remove('pop-show')
})
const unmount = () => {
  if (mountParentNode) {
    render(null, mountParentNode)
  }
}
if (props.destroyOnRouteChange) {
  const router = useRouter()
  watch(router.currentRoute, () => {
    unmount()
  })
}
</script>
<style lang="less">
.pop-show {
  overflow: hidden !important;
}
.basePop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background: #fff;
}
</style>
