<template>
  <v-container>
    <v-row>
      <v-col>
        <v-breadcrumbs large :items="breadcrumbs" divider="/">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href">
              {{ item.text.toUpperCase() }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-chip v-for="category in categories"
                class="ma-2"
                :dark="categoryObject(category).isDarkColor()"
                :color="categoryObject(category).color()"
                :to="`/videos/categories/${category}`"
                :label="videoCategory === category"
                :key="category">
          {{ categoryObject(category).label() }}
        </v-chip>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6" v-for="video in videos" :key="video.uid">
        <Video :url="video.url" :title="video.title" :category="video.category" :author="video.author" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Video from '@/components/Video.vue'
import { mapState } from 'vuex'
import { CATEGORIES } from '@/constants/constants.js'
import Category from '@/models/category.js'

export default {
  name: 'Videos',
  components: {
    Video
  },
  props: {
    category: {
      type: String,
      required: false
    }
  },
  mounted() {
    this.$store.dispatch('setTitle', 'Videos')
    this.$store.dispatch('setVideoCategory', this.category)
    this.$store.dispatch('bindVideosRef')
  },
  computed: {
    ...mapState(['videos', 'videoCategory']),
    breadcrumbs() {
      return [
        { text: 'Videos', href: '/videos' },
        this.categoryBreadcrumb
      ].filter(item => item)
    },
    categoryBreadcrumb() {
      if (this.videoCategory) {
        return {
          text: this.videoCategory
        }
      } else {
        return null
      }
    },
    categories() {
      return CATEGORIES
    }
  },
  methods: {
    categoryObject(category) {
      return new Category(category)
    }
  }
}
</script>

<style></style>
