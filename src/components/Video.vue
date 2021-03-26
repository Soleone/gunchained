<template>
  <v-card class="mx-auto" :max-width="cardWidth" :to="`/videos/${id}`">
    <v-card-title class="text-subtitle-1 flex justify-space-between">
      <span>{{ video.title }}</span>
      <v-btn v-if="isUserAdmin" icon :to="`/videos/edit/${id}`"><v-icon>mdi-pencil</v-icon></v-btn>
    </v-card-title>
    <v-card-subtitle>
      By
      <a href="#" @click.prevent="visitAuthor(video.author)">{{ video.author }}</a>
    </v-card-subtitle>
    <iframe v-if="showEmbed"
            class="mx-2"
            :width="width"
            :height="height"
            :src="embedUrl"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    </iframe>
    <v-img v-if="!showEmbed" class="mx-2 mb-2" :src="video.imageUrl">
    </v-img>
    <v-card-text class="py-0 pb-2 d-flex justify-space-between align-center">
      <v-chip :dark="categoryObject.isDarkColor()" :color="categoryObject.color()" :to="`/videos/categories/${video.category}`">
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

import { mapState, mapGetters } from 'vuex'
import Category from '@/models/category.js'
import Tooltip from '@/components/vuetify-ext/Tooltip.vue'
import dayjs from 'dayjs'

export default {
  name: 'Video',
  components: {
    Tooltip
  },
  props: {
    id: {
      type: String,
      required: true
    },
    video: {
      type: Object,
      required: true
    },
    showEmbed: {
      type: Boolean,
      default: true
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
    ...mapGetters(['isUserAdmin']),
    embedUrl() {
      return this.video.url.replace('/watch?v=', '/embed/')
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
      return new Category(this.video.category)
    },
    addedAtFormatted() {
      return dayjs(this.video.addedAt.toDate()).format('DD/MM/YYYY')
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
