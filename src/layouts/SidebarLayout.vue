<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PsiSidebar from '../components/PsiSidebar.vue'
import PsiNavbar from '../components/PsiNavbar.vue'

const route = useRoute()

const showSidebar = ref(false)

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
        @menu-click="showSidebar = !showSidebar"
      ></psi-navbar>
      <router-view></router-view>
    </div>
  </div>
</template>
