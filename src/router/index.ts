import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
// import NodeDetail from '../pages/NodeDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  // { path: '/node/:id', name: 'NodeDetail', component: NodeDetail },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
