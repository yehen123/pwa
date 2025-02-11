<template>
  <button :class="buttonClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'SiteButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  computed: {
    buttonClass() {
      return {
        'site-button': true,
        gradient: true,
        'site-button--disabled': this.disabled,
      }
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    },
  },
}
</script>

<style scoped lang="less">
.site-button {
  display: inline-block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s;
  letter-spacing: 1px;
}

.site-button:hover {
  background-color: #0056b3;
}

.site-button--disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.gradient {
  background: linear-gradient(27deg, #f83a3a 10%, #f13dd4 50%, #7000ff 90%);
}
</style>
