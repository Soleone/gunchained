import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// The theme picker (picker/) owns the palette: it sets data-theme and .dark on <html>, and
// src/styles/theme.css points Vuetify's colors at its tokens. Vuetify only follows dark or light.
const root = document.documentElement
const isDark = () => root.classList.contains('dark')

const vuetify = new Vuetify({
  theme: { dark: isDark(), options: { customProperties: true } }
})

new MutationObserver(() => {
  vuetify.framework.theme.dark = isDark()
}).observe(root, { attributes: true, attributeFilter: ['class'] })

export default vuetify
