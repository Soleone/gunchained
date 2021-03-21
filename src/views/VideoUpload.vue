<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-text-field label="Youtube URL" v-model="url" @change="fetchMetadata" required>
            </v-text-field>

            <v-text-field label="Title" v-model="title" required>
            </v-text-field>

            <v-img :src="imageUrl" max-width="480" max-height="360" class="mb-4"></v-img>

            <v-text-field label="Author" v-model="author" required>
            </v-text-field>

            <v-select label="Category" :items="categories" v-model="category">
            </v-select>

            <v-textarea label="Description" v-model="description">
            </v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn color="success" @click="upload">Upload</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { CATEGORIES } from '@/constants/constants.js'

export default {
  name: 'VideoUpload',
  data() {
    return {
      url: null,
      author: null,
      title: null,
      category: null,
      description: null,
      imageUrl: "/placeholder_image.png",
      baseURL: "https://www.youtube.com/oembed?format=json"
    }
  },
  computed: {
    categories() {
      return Object.values(CATEGORIES)
    },
    video() {
      return {
        url: this.url,
        author: this.author,
        title: this.title,
        url: this.url,
        category: this.category,
        description: this.description
      }
    }
  },
  methods: {
    fetchMetadata() {
      const url = `${this.baseURL}&url=${this.url}`
      console.log(`Fetching Youtube metadata for url = ${url}`)
      axios.get(url).then(response => {
        console.log(response)
        const data = response.data
        this.author = data['author_name']
        this.title = data['title']
        this.imageUrl = data['thumbnail_url']
      })
    },
    upload() {
      this.$store.dispatch('uploadVideo', this.video)
    }
  }
}
</script>

<style></style>
