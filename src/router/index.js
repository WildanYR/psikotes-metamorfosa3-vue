import { createRouter, createWebHistory } from 'vue-router'
import TestingComponent from '../views/TestingComponent.vue'

const routes = [
  {
    path: '/test',
    component: TestingComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
