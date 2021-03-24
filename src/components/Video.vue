<template>
  <v-card class="mx-auto" :max-width="cardWidth">
    <v-card-title class="text-subtitle-1">{{ title }}</v-card-title>
    <v-card-subtitle>
      By
      <a href="#" @click.prevent="visitAuthor(author)">{{ author }}</a>
    </v-card-subtitle>
    <v-img class="mx-2">
      <iframe :width="width"
              :height="height"
              :src="embedUrl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </v-img>
    <v-card-text class="py-0 pb-2 d-flex justify-space-between align-center">
      <v-chip :dark="categoryObject.isDarkColor()" :color="categoryObject.color()" :to="`/videos/categories/${category}`">
        {{ categoryObject.label() }}
      </v-chip>
      <Tooltip tooltip="When this video was added to Gunchained. Typically not when it was created." top>
        <v-chip outlined>
          <v-icon left>mdi-clock-outline</v-icon>
          {{ addedAtFormatted }}
        </v-chip>
      </Tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
const DIMENSIONS = {
}

import Category from '@/models/category.js'
import Tooltip from '@/components/vuetify-ext/Tooltip.vue'
import dayjs from 'dayjs'

export default {
  name: 'Video',
  components: {
    Tooltip
  },
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
    },
    addedAt: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dimensions: {
        lg: {
          width: 560,
          height: 350
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
    cardWidth() {
      return this.width + 12
    },
    currentDimensions() {
      return this.$vuetify.breakpoint.lgAndUp ? this.dimensions['lg'] : this.dimensions['sm']
    },
    categoryObject() {
      return new Category(this.category)
    },
    addedAtFormatted() {
      return dayjs(this.addedAt.toDate()).format('DD/MM/YYYY')
    }
  },
  methods: {
    visitAuthor(author) {
      this.$router.push(`/videos/authors/${author}`)
    }
  }
}
</script>

<style></style>
