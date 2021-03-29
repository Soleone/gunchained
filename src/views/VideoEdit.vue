<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-text-field label="Youtube URL" v-model="video.url" @change="fetchMetadata" required></v-text-field>

            <v-text-field label="Title" v-model="video.title" required></v-text-field>

            <v-img :src="video.imageUrl" max-width="480" max-height="360" class="mb-4"></v-img>

            <v-text-field label="Author" v-model="video.author" required></v-text-field>

            <v-select label="Category" :items="categories" v-model="video.category"></v-select>

            <v-textarea label="Description" v-model="video.description"></v-textarea>
          </v-card-text>
          <v-card-actions class="flex justify-space-between">
            <v-btn v-if="!id" color="success" @click="create">Create</v-btn>
            <v-btn v-if="id" color="success" @click="update">Update</v-btn>

            <v-btn v-if="isUserAdmin" color="error" @click="destroy">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { CATEGORIES } from '@/constants/constants.js'
import { store } from '@/plugins/firebase'

export default {
  name: 'VideoEdit',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      baseURL: "https://www.youtube.com/oembed?format=json",
      video: {
        url: null,
        author: null,
        title: null,
        category: null,
        description: null,
        imageUrl: "/placeholder_image.png",
        addedAt: null
      }
    }
  },
  mounted() {
    if (this.id) {
      this.fetchVideo()
    }
  },
  computed: {
    ...mapGetters(['isUserAdmin']),
    categories() {
      return CATEGORIES
    }
  },
  methods: {
    fetchMetadata() {
      const url = `${this.baseURL}&url=${this.video.url}`
      axios.get(url).then(response => {
        console.log(response)
        const data = response.data
        this.video.author = data['author_name']
        this.video.title = data['title']
        this.video.imageUrl = data['thumbnail_url']
      })
    },
    fetchVideo() {
      store.collection('videos').doc(this.id).get().then((doc) => {
        const video = doc.data()
        this.video.url = video.url
        this.video.author = video.author
        this.video.title = video.title
        this.video.category = video.category
        this.video.description = video.description
        this.video.addedAt = video.addedAt

        if (video.imageUrl) {
          this.video.imageUrl = video.imageUrl
        }
      })
    },
    create() {
      this.$store.dispatch('createVideo', this.video)
    },
    update() {
      this.$store.dispatch('updateVideo', { id: this.id, video: this.video })
    },
    destroy() {
      this.$store.dispatch('deleteVideo', this.id)
      this.$router.push({ name: 'Videos' })
    }
  }
}
</script>

<style></style>
