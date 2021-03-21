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
      <v-chip class="ma-2" color="primary" @click="visitCategory(category)">
        {{ category}}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
const DIMENSIONS = {
}

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
    }
  },
  methods: {
    visitCategory(category) {
      this.$router.push(`/videos/categories/${category}`)
    }
  }
}
</script>

<style></style>
