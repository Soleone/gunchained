import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Player from '../views/Player.vue'
import Videos from '../views/Videos.vue'
import VideoUpload from '../views/VideoUpload.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/videos',
    name: 'Videos',
    component: Videos
  },
  {
    path: '/upload',
    name: 'VideoUpload',
    component: VideoUpload
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
