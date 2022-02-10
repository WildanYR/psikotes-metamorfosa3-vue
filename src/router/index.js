import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import TestingComponent from '../views/TestingComponent.vue'
import authRoute from './auth.route'

const routes = [
  {
    path: '/test',
    component: TestingComponent
  },
  {
    name: 'AuthLayout',
    path: '/',
    component: AuthLayout,
    children: [...authRoute]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
