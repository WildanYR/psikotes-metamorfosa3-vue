<script setup>
import { ClockIcon } from '@heroicons/vue/outline'
import { onBeforeUnmount, ref } from 'vue'

const waktu = ref({
  jam: '',
  tanggal: ''
})

const interval = setInterval(() => {
  const dateNow = new Date()
  waktu.value.jam = new Intl.DateTimeFormat('id', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(dateNow)
  waktu.value.tanggal = new Intl.DateTimeFormat('id', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateNow)
}, 1000)

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md"
  >
    <div class="w-max rounded-xl bg-violet-100 p-2 text-violet-500">
      <clock-icon class="h-14 w-14" />
    </div>
    <p class="mt-2 mb-1 text-gray-500">Jam</p>
    <p class="text-2xl font-bold text-gray-800">{{ waktu.jam }}</p>
    <p class="font-bold text-gray-500">{{ waktu.tanggal }}</p>
  </div>
</template>
