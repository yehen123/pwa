<template>
  <van-icon class-prefix="icon" :name="name" :style="style"></van-icon>
</template>

<script>
export default {
  props: {
    name: {
      require: true,
      type: String,
    },
    size: {
      type: Number,
    },
    color: {
      type: String,
    },
  },
  computed: {
    style() {
      let r = {}
      if (typeof this.size === 'number') {
        r = {
          ...r,
          fontSize: `${this.size / 100}rem`,
        }
      }
      if (this.color) {
        r = {
          ...r,
          color: this.color,
        }
      }
      return r
    },
  },
}
</script>

<style scoped>
.icon {
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: -0.125em;
}
</style>
