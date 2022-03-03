<script setup>
import { CubeIcon } from '@heroicons/vue/outline'
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md"
  >
    <div class="w-max rounded-xl bg-emerald-100 p-2 text-emerald-500">
      <cube-icon class="h-14 w-14" />
    </div>
    <p class="mt-4 mb-2 text-gray-500">Sesi psikotes</p>
    <p class="text-2xl font-bold text-gray-800"><slot></slot></p>
  </div>
</template>
