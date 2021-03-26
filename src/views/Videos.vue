<template>
  <v-container>
    <v-row v-if="videoAuthor">
      <v-col>
        <v-breadcrumbs large :items="breadcrumbs" divider="/">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href">
              {{ item.text }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-chip class="mr-1 mb-2" to="/videos" :label="!videoCategory">
          All
        </v-chip>

        <v-chip v-for="category in categories"
                class="mr-1 mb-2"
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
      <v-col cols="12" lg="6" xl="4" v-for="video in videos" :key="video.id">
        <Video :id="video.id" :video="video" :showEmbed="false" />
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
    },
    author: {
      type: String,
      required: false
    },
  },
  mounted() {
    this.$store.dispatch('setTitle', 'Videos')
    this.$store.dispatch('setVideoAuthor', this.author)
    this.$store.dispatch('setVideoCategory', this.category)
    this.$store.dispatch('bindVideosRef')
  },
  computed: {
    ...mapState(['videos', 'videoCategory', 'videoAuthor']),
    breadcrumbs() {
      return [
        { text: 'Authors', href: '/videos' },
        this.authorBreadcrumb
      ].filter(item => item)
    },
   authorBreadcrumb() {
      if (this.videoAuthor) {
        return {
          text: this.videoAuthor
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
