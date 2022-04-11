import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../layouts/AuthLayout.vue'
import SidebarLayout from '../layouts/SidebarLayout.vue'
import PsikotesLayout from '../layouts/PsikotesLayout.vue'
import authRoute from './auth.route'
import pesertaRoute from './peserta.route'
import adminRoute from './admin.route'
import psikotesRoute from './psikotes.route'

import { registerStatus } from '../services/authService'
import { useAuthStore } from '../stores/auth'
import { usePsikotesStore } from '../stores/psikotes'
import { useLoadingStore } from '../stores/loading'

const checkRegisterStatus = async () => {
  try {
    const status = await registerStatus()
    return status.registerStatus
  } catch (error) {
    return false
  }
}

const routes = [
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
  },
  {
    name: 'AdminLayout',
    path: '/admin',
    component: SidebarLayout,
    children: adminRoute.map((item) => {
      const { nav, ...route } = item
      return route
    }),
    meta: {
      navs: adminRoute.map((item) => ({ ...item.nav, name: item.name }))
    }
  },
  {
    name: 'PsikotesLayout',
    path: '/psikotes',
    component: PsikotesLayout,
    children: [...psikotesRoute]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const loadingStore = useLoadingStore()
  const authStore = useAuthStore()
  const psikotesStore = usePsikotesStore()
  const isTokenExist = !!localStorage.getItem('token')
  if (to.meta.checkRegister) {
    loadingStore.global = true
    const registerStatus = await checkRegisterStatus()
    authStore.registerStatus = registerStatus
    loadingStore.global = false
    if (to.meta.protectRegister && !registerStatus) {
      return { name: 'login' }
    }
  }
  if (!to.meta.authRoute && isTokenExist) {
    if (authStore.userData.role === 'admin') {
      return { name: 'sesi_admin' }
    } else {
      return { name: 'dashboard_peserta' }
    }
  }
  if (to.meta.authRoute && !isTokenExist) {
    return { name: 'login' }
  }
  if (to.meta.authRole === 'ADMIN' && authStore.userData.role !== 'admin') {
    return { name: 'dashboard_peserta' }
  }
  if (to.meta.authRole === 'USER' && authStore.userData.role !== 'peserta') {
    return { name: 'sesi_admin' }
  }
  if (!psikotesStore.mengerjakan && to.meta.psikotes) {
    return { name: 'dashboard_peserta' }
  }
  if (psikotesStore.mengerjakan && !to.meta.psikotes) {
    return { name: 'psikotes_petunjuk' }
  }
  return true
})

export default router
