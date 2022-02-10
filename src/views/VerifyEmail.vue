<script setup>
import { MailIcon } from '@heroicons/vue/solid'
import PsiButton from '../components/PsiButton.vue'
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="rounded-full bg-blue-100 p-4">
      <mail-icon class="h-28 w-28 text-blue-600" />
    </div>
    <h1 class="text-2xl font-bold text-gray-800">Konfirmasi Email Anda</h1>
    <p class="text-center text-gray-700">
      Kami telah mengirimkan email konfirmasi ke
      <span class="font-bold">tes@gmail.com</span>. Silahkan buka email tersebut
      untuk konfirmasi
    </p>
    <psi-button>Kirim ulang konfirmasi</psi-button>
    <div class="text-center">
      <p class="text-lg font-medium">01:59</p>
      <p class="text-sm">Mohon menunggu untuk kirim konfirmasi ulang</p>
    </div>
  </div>
</template>
