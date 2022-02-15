import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import SidebarLayout from '../layouts/SidebarLayout.vue'
import TestingComponent from '../views/TestingComponent.vue'
import authRoute from './auth.route'
import pesertaRoute from './peserta.route'

const routes = [
  {
    path: '/test',
    component: TestingComponent
  },
  {
    name: 'PesertaLayout',
    path: '/',
    component: SidebarLayout,
    children: pesertaRoute.map((item) => {
      const { nav, ...route } = item
      return route
    }),
    meta: {
      navs: pesertaRoute.map((item) => ({ ...item.nav, name: item.name }))
    }
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
