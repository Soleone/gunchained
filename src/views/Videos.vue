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
      <v-col cols="12" lg="10">
        <GATrack event-name="clickCategoryFromList" event-label="All">
          <v-chip class="mr-1 mb-2" to="/videos" :label="!videoCategory">
            All
          </v-chip>
        </GATrack>

        <GATrack v-for="category in categories" event-name="clickCategoryFromList" :event-label="category" :key="category">
          <v-chip class="mr-1 mb-2"
                  :dark="categoryObject(category).isDarkColor()"
                  :color="categoryObject(category).color()"
                  :to="`/videos/categories/${category}`"
                  :label="videoCategory === category">
            {{ categoryObject(category).label() }}
          </v-chip>
        </GATrack>
      </v-col>
      <v-col class="text-lg-right">
        <v-chip label outlined @click="visitRSS()">
          <v-avatar left tile>
            <v-img src="/rss.svg"></v-img>
          </v-avatar>
          Subscribe via RSS
        </v-chip>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6" xl="4" v-for="video in videos" :key="video.id">
        <GATrack event-name="videoClickedFromList" :event-label="video.title">
          <Video :id="video.id" :video="video" :showEmbed="false" />
        </GATrack>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Video from '@/components/Video.vue'
import { mapState } from 'vuex'
import { CATEGORIES } from '@/constants/constants.js'
import Category from '@/models/category.js'
import GATrack from '@/components/shared/GATrack.js'

export default {
  name: 'Videos',
  components: {
    Video,
    GATrack
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
    },
    visitRSS() {
      window.location.href = '/feed.xml'
    }
  },
  head: {
    link: [
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: 'Gunchained videos feed',
        href: '/feed.xml'
      }
    ]
  }
}
</script>

<style></style>
