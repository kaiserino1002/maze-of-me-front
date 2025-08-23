import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Map from '../pages/Map.vue'
import AnalyzeTest from '../pages/AnalyzeTest.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login, meta: { requiresAuth: false } },
  { path: '/map', name: 'Map', component: Map },
  { path: '/analyze-test', name: 'AnalyzeTest', component: AnalyzeTest },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
