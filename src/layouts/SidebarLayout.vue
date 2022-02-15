<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PsiSidebar from '../components/PsiSidebar.vue'
import PsiNavbar from '../components/PsiNavbar.vue'

const route = useRoute()

const showSidebar = ref(false)

const navs = computed(() => {
  return route.meta.navs.map((item) => ({
    ...item,
    active: item.name === route.matched[1].name
  }))
})
onMounted(() => {
  if (window.screen.width >= 768) {
    showSidebar.value = true
  }
  console.log(route.matched)
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
      <psi-navbar @menu-click="showSidebar = !showSidebar"></psi-navbar>
      <router-view></router-view>
    </div>
  </div>
</template>
