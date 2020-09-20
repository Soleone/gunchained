<template>
  <v-tooltip :bottom="bottom" v-if="visible">
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <slot></slot>
      </span>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    tooltip: {
      type: String,
      required: true
    },
    bottom: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style></style>
