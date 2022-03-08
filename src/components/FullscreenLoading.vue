<script setup>
import LoadingSpinner from './LoadingSpinner.vue'
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-center gap-5 bg-blue-300"
  >
    <img
      src="../assets/logo.png"
      alt="logo ppt metamorfosa"
      class="pointer-events-none w-64 sm:w-80"
    />
    <loading-spinner class="h-16 w-16 animate-spin text-white" />
  </div>
</template>
