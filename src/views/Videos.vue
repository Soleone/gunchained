<template>
  <v-container>
    <v-row v-for="video in videos" :key="video.uid">
      <v-spacer></v-spacer>
      <v-col cols="12">
        <Video :url="video.url" :title="video.title" :category="video.category" :author="video.author" />
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import Video from '@/components/Video.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Videos',
  components: {
    Video
  },
  mounted() {
    this.$store.dispatch('bindVideosRef')
  },
  computed: {
    ...mapState(['videos'])
  }
}
</script>

<style></style>
