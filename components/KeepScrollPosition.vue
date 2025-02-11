<template>
  <div ref="scrollEl">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
    }
  },
  activated() {
    this.$nextTick(() => {
      this.$refs.scrollEl.scrollLeft = this.x
      this.$refs.scrollEl.scrollTop = this.y
    })
  },
  deactivated() {
    this.x = this.$refs.scrollEl.scrollLeft
    this.y = this.$refs.scrollEl.scrollTop
  },
}
</script>
