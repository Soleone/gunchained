<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-text-field
              label="Youtube URL"
              v-model="video.url"
              @change="fetchMetadata"
              required
            ></v-text-field>

            <v-text-field
              label="Title"
              v-model="video.title"
              required
            ></v-text-field>

            <v-img
              :src="video.imageUrl"
              max-width="480"
              max-height="360"
              class="mb-4"
            ></v-img>

            <v-text-field
              label="Author"
              v-model="video.author"
              required
            ></v-text-field>

            <v-select
              label="Category"
              :items="categories"
              v-model="video.category"
            ></v-select>

            <v-textarea
              label="Description"
              v-model="video.description"
            ></v-textarea>

            <v-text-field
              label="Published at"
              v-model="video.publishedAt"
              required
            ></v-text-field>

            <v-text-field
              label="Youtube API Key"
              v-model="apiKey"
              type="password"
              @change="storeInLocalStorage"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="flex justify-space-between">
            <v-btn v-if="!id" color="success" @click="create">Create</v-btn>
            <v-btn v-if="id" color="success" @click="update">Update</v-btn>

            <v-btn v-if="isUserAdmin" color="error" @click="destroy"
              >Delete</v-btn
            >
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
import dayjs from 'dayjs'

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
      baseURL: 'https://www.youtube.com/oembed?format=json',
      youtubeAPIBaseUrl: 'https://www.googleapis.com/youtube/v3/videos',
      apiKey: null,
      video: {
        url: null,
        author: null,
        title: null,
        category: null,
        description: null,
        imageUrl: '/placeholder_image.png',
        addedAt: null,
        publishedAt: null
      }
    }
  },
  mounted() {
    if (this.id) {
      this.fetchVideo()
    }

    const youtubeApiKey = localStorage.getItem('youtube-api-key')
    if (youtubeApiKey) {
      this.apiKey = youtubeApiKey
    }
  },
  computed: {
    ...mapGetters(['isUserAdmin']),
    categories() {
      return CATEGORIES
    },
    videoId() {
      return this.video.url
        .replace('https://www.youtube.com/watch?v=', '')
        .replace('https://youtu.be/', '')
    }
  },
  methods: {
    fetchMetadata() {
      const videoId = this.videoId
      console.log('Looking up metadata from Youtube for video id', videoId)
      const url = `${this.youtubeAPIBaseUrl}?part=snippet,statistics&key=${this.apiKey}&id=${videoId}`
      axios.get(url).then(response => {
        console.log(response)
        const data = response.data
        const videoData = response.data.items[0]
        console.log(videoData)
        this.video.author = videoData.snippet.channelTitle
        this.video.title = videoData.snippet.title
        const thumbnail =
          videoData.snippet.thumbnails['high']?.url ||
          this.backupImageUrl(videoId)
        if (thumbnail) {
          console.log(`Image: ${thumbnail}`)
          this.video.imageUrl = thumbnail
        }
        this.video.description = videoData.snippet.description
        this.video.publishedAt = dayjs(videoData.snippet.publishedAt).toDate()
      })
    },
    fetchVideo() {
      store
        .collection('videos')
        .doc(this.id)
        .get()
        .then(doc => {
          const video = doc.data()
          this.video.url = video.url
          this.video.author = video.author
          this.video.title = video.title
          this.video.category = video.category
          this.video.description = video.description
          this.video.addedAt = video.addedAt

          if (video.publishedAt) {
            this.video.publishedAt = dayjs(video.publishedAt).toDate()
          }
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
    },
    storeInLocalStorage() {
      window.localStorage.setItem('youtube-api-key', this.apiKey)
    },
    backupImageUrl(videoId) {
      return `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`
    }
  }
}
</script>

<style></style>
