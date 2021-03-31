<template>
  <div class="flex flex-column">
    <div :class="{ 'mb-4': showEmbed }">
      <v-card class="mx-auto" :max-width="cardWidth" :to="`/videos/${id}`" :ripple="!showEmbed">
        <v-card-title class="text-subtitle-1 flex justify-space-between">
          <span>{{ video.title }}</span>
          <v-btn v-if="isUserAdmin" icon :to="`/videos/edit/${id}`"><v-icon>mdi-pencil</v-icon></v-btn>
        </v-card-title>
        <v-card-subtitle>
          By
          <GATrack event-name="clickAuthor" :event-label="video.author">
            <a href="#" @click.prevent="visitAuthor(video.author)">{{ video.author }}</a>
          </GATrack>
        </v-card-subtitle>

        <GATrack event-name="videoClicked" v-if="showEmbed">
          <iframe class="mx-2"
                  :width="width"
                  :height="height"
                  :src="embedUrl"
                  frameborder="0"
                  allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </GATrack>
        <v-img v-if="!showEmbed" class="mx-2 mb-2" :src="video.imageUrl"></v-img>

        <v-card-text class="py-0 pb-2 d-flex justify-space-between align-center">
          <GATrack event-name="clickCategoryFromVideo" :event-label="video.category">
            <v-chip :dark="categoryObject.isDarkColor()" :color="categoryObject.color()" :to="`/videos/categories/${video.category}`">
              {{ categoryObject.label() }}
            </v-chip>
          </GATrack>
          <Tooltip tooltip="When this video was added to Gunchained. Typically not when it was created." top>
            <v-chip outlined>
              <v-icon left>mdi-clock-outline</v-icon>
              {{ addedAtFormatted }}
            </v-chip>
          </Tooltip>
        </v-card-text>
      </v-card>
    </div>
    <div v-if="showEmbed" class="flex justify-center justify-lg-space-around text-center">
      <GATrack event-name="subscribeToAuthor" :event-label="video.author">
        <span>
          <v-btn class="error" :href="`${channelUrl}?sub_confirmation=1`" target="youtube">
            <v-icon left>mdi-youtube</v-icon> Subscribe
          </v-btn>
          <v-chip class="ml-2" label outlined v-if="this.$vuetify.breakpoint.lgAndUp" :href="`${channelUrl}?sub_confirmation=1`" target="youtube">Support the author on Youtube</v-chip>
        </span>
      </GATrack>
    </div>
  </div>
</template>

<script>
const DIMENSIONS = {
}

import dayjs from 'dayjs'
import { mapGetters } from 'vuex'
import { CHANNELS_BY_AUTHOR } from '@/constants/constants.js'
import Category from '@/models/category.js'
import Tooltip from '@/components/vuetify-ext/Tooltip.vue'
import GATrack from '@/components/shared/GATrack.js'

export default {
  name: 'Video',
  components: {
    Tooltip,
    GATrack
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
      return this.currentDimensions.width * this.dimensionsModifier
    },
    height() {
      return this.currentDimensions.height * this.dimensionsModifier
    },
    cardWidth() {
      return this.width + 12
    },
    currentDimensions() {
      return this.$vuetify.breakpoint.lgAndUp ? this.dimensions['lg'] : this.dimensions['sm']
    },
    dimensionsModifier() {
      return this.showEmbed && this.$vuetify.breakpoint.lgAndUp ? 1.5 : 1
    },
    categoryObject() {
      return new Category(this.video.category)
    },
    addedAtFormatted() {
      return dayjs(this.video.addedAt.toDate()).format('DD/MM/YYYY')
    },
    channelUrl() {
      return CHANNELS_BY_AUTHOR[this.video.author]
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
