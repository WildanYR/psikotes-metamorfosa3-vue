<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PsiSidebar from '../components/PsiSidebar.vue'
import PsiNavbar from '../components/PsiNavbar.vue'
import { useAuthStore } from '../stores/auth'
import { logout } from '../services/authService'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const showSidebar = ref(false)
const loadingLogout = ref(false)

const navs = computed(() => {
  return route.meta.navs
    .filter((item) => !item.hidden)
    .map((item) => ({
      ...item,
      active: item.name === route.matched[1].name
    }))
})
const activeNav = computed(() =>
  route.meta.navs.find((item) => item.name === route.matched[1].name)
)
const handleLogout = () => {
  loadingLogout.value = true
  logout()
    .then(() => {
      localStorage.removeItem('token')
      authStore.resetState()
      router.push({ name: 'login' })
    })
    .finally(() => {
      loadingLogout.value = false
    })
}
onMounted(() => {
  if (window.screen.width >= 768) {
    showSidebar.value = true
  }
})
</script>

<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-900 antialiased">
    <!-- Sidebar -->
    <psi-sidebar
      :is-open="showSidebar"
      :navs="navs"
      @close="showSidebar = false"
    />
    <!-- Content -->
    <div :class="['flex flex-1 flex-col gap-6 p-4', showSidebar && 'md:ml-64']">
      <psi-navbar
        :page="activeNav.label"
        :email="authStore.userData.email"
        :logout-loading="loadingLogout"
        @menu-click="showSidebar = !showSidebar"
        @on-logout="handleLogout"
      ></psi-navbar>
      <router-view></router-view>
    </div>
  </div>
</template>
