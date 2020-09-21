<template>
  <v-btn text small class="text-none caption" :target="target" :href="href">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: 'FooterBtn',
  props: {
    target: {
      type: String,
      default: null
    },
    href: {
      type: String,
      required: true
    }
  }
}
</script>

<style></style>
