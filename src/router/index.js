import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Arena from '../views/Arena.vue'
import Login from '../views/Login.vue'
import Player from '../views/Player.vue'
import VideoShow from '../views/VideoShow.vue'
import Videos from '../views/Videos.vue'
import VideoEdit from '../views/VideoEdit.vue'
import Feedback from '../views/Feedback.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/',
    name: 'Videos',
    component: Videos
  },
  {
    path: '/arena',
    name: 'Arena',
    component: Arena
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/player',
    name: 'Player',
    component: Player
  },
  {
    path: '/videos/:id',
    name: 'VideoShow',
    component: VideoShow,
    props: true
  },
  {
    path: '/upload',
    name: 'VideoUpload',
    component: VideoEdit
  },
  {
    path: '/videos/edit/:id',
    name: 'VideoEdit',
    component: VideoEdit,
    props: true
  },
  {
    path: '/videos/categories/:category',
    name: 'VideosByCategory',
    component: Videos,
    props: true
  },
  {
    path: '/videos/authors/:author',
    name: 'VideosByAuthor',
    component: Videos,
    props: true
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
