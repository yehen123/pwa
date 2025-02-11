<template>
  <div class="swiper-container">
    <div ref="wrapper" class="swiper-wrapper">
      <div v-for="(slide, index) in slides" :key="index" class="swiper-slide">
        <slot :name="'slide-' + index" :slide="slide" :index="index">
          <img :src="slide" alt="Slide Image" />
        </slot>
      </div>
    </div>
    <div class="swiper-pagination">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></span>
    </div>
    <div class="swiper-button-next" @click="nextSlide"></div>
    <div class="swiper-button-prev" @click="prevSlide"></div>
  </div>
</template>

<script>
export default {
  name: 'SiteSwipper',
  props: {
    slides: {
      type: Array,
      required: true,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    autoplayInterval: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {
      currentIndex: 0,
      autoplayTimer: null,
    }
  },
  mounted() {
    if (this.autoplay) {
      this.startAutoplay()
    }
  },
  beforeUnmount() {
    this.stopAutoplay()
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length
      this.updateSlidePosition()
      this.resetAutoplay()
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length
      this.updateSlidePosition()
      this.resetAutoplay()
    },
    goToSlide(index) {
      this.currentIndex = index
      this.updateSlidePosition()
      this.resetAutoplay()
    },
    updateSlidePosition() {
      const wrapper = this.$refs.wrapper
      wrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`
    },
    startAutoplay() {
      this.autoplayTimer = setInterval(this.nextSlide, this.autoplayInterval)
    },
    stopAutoplay() {
      if (this.autoplayTimer) {
        clearInterval(this.autoplayTimer)
        this.autoplayTimer = null
      }
    },
    resetAutoplay() {
      if (this.autoplay) {
        this.stopAutoplay()
        this.startAutoplay()
      }
    },
  },
}
</script>

<style scoped>
.swiper-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.swiper-wrapper {
  display: flex;
  transition: transform 0.3s ease-in-out;
}
.swiper-slide {
  min-width: 100%;
  box-sizing: border-box;
}
.swiper-pagination {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.swiper-pagination span {
  width: 6px;
  height: 6px;
  background: #9a9a9a;
  border-radius: 3px;
  margin: 0 4px;
  cursor: pointer;
}
.swiper-pagination .active {
  width: 30px;
  background: #fff;
}
.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.swiper-button-next {
  display: none;
  right: 10px;
}
.swiper-button-prev {
  display: none;
  left: 10px;
}
</style>
