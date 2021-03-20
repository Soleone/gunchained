<template>
  <v-card class="mx-auto" max-width="320">
    <v-card-title>{{ title }}</v-card-title>
    <v-img class="mx-2">
      <iframe width="320"
              height="200"
              :src="embedUrl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </v-img>
    <v-card-text class="d-flex justify-space-between align-center py-0">
      <span>By {{ author }}</span>
      <v-chip class="ma-2" color="primary">
        {{ category}}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
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
  computed: {
    embedUrl() {
      return this.url.replace('/watch?v=', '/embed/')
    }
  }
}
</script>

<style></style>
