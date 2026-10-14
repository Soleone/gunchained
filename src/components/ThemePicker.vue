<template>
  <div class="theme-picker" ref="slot"></div>
</template>

<script>
// A slot for the React theme picker (picker/, served from /theme/picker.js), which may load before or after Vue.
export default {
  name: 'ThemePicker',
  mounted() {
    if (window.gunchainedThemePicker) return this.mount()
    window.addEventListener('gunchained-theme-picker', this.mount, { once: true })
  },
  beforeDestroy() {
    window.removeEventListener('gunchained-theme-picker', this.mount)
    if (this.unmount) this.unmount()
  },
  methods: {
    mount() {
      this.unmount = window.gunchainedThemePicker.mount(this.$refs.slot)
    }
  }
}
</script>
