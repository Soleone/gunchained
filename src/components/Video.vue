<template>
  <v-card class="mx-auto" :max-width="width">
    <v-card-title class="text-subtitle-1">{{ title }}</v-card-title>
    <v-img class="mx-2">
      <iframe :width="width"
              :height="height"
              :src="embedUrl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </v-img>
    <v-card-text class="d-flex justify-space-between align-center py-0">
      <span>By {{ author }}</span>
      <v-chip class="ma-2" :dark="categoryObject.isDarkColor()" :color="categoryObject.color()" :to="`/videos/categories/${category}`">
        {{ categoryObject.label() }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
const DIMENSIONS = {
}

import Category from '@/models/category.js'

export default {
  name: 'Video',
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
      },
    author: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dimensions: {
        lg: {
          width: 640,
          height: 385
        },
        sm: {
          width: 320,
          height: 200
        }
      }
    }
  },
  computed: {
    embedUrl() {
      return this.url.replace('/watch?v=', '/embed/')
    },
    width() {
      return this.currentDimensions.width
    },
    height() {
      return this.currentDimensions.height
    },
    currentDimensions() {
      return this.dimensions[this.$vuetify.breakpoint.name] || this.dimensions['sm']
    },
    categoryObject() {
      return new Category(this.category)
    }
  }
}
</script>

<style></style>
