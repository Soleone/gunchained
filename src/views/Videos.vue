<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" v-for="video in videos" :key="video.uid">
        <Video :url="video.url" :title="video.title" :category="video.category" :author="video.author" />
      </v-col>
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
    this.$store.dispatch('setTitle', 'Videos')
  },
  computed: {
    ...mapState(['videos'])
  }
}
</script>

<style></style>
