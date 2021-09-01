<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-btn :to="{ name: 'Videos' }" color="primary">
          <v-icon left>mdi-arrow-left</v-icon>
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Video v-if="video" :id="id" :video="video" :showEmbed="true" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Video from '@/components/Video.vue'
import { mapState } from 'vuex'

export default {
  name: 'VideoShow',
  components: {
    Video,
  },
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  mounted() {
    this.$store.dispatch('loadCurrentVideo', this.id)
  },
  computed: {
    ...mapState({ video: 'currentVideo' }),
    breadcrumbs() {
      return [
        { text: 'Videos', to: "{ name: 'Videos' }" },
        { text: this.video.title },
      ]
    },
  },
}
</script>

<style></style>
