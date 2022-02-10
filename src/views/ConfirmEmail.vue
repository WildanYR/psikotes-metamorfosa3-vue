<script setup>
import { CheckCircleIcon } from '@heroicons/vue/solid'
import PsiButton from '../components/PsiButton.vue'
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <check-circle-icon class="h-24 w-24 text-blue-600" />
    <h1 class="text-2xl font-bold text-gray-800">Email Terkonfirmasi</h1>
    <p class="text-center text-gray-700">
      Email <span class="font-bold">tes@gmail.com</span> telah aktif dan bisa
      digunakan. Tekan tombol dibawah untuk menuju beranda
    </p>
    <psi-button>Menuju Beranda</psi-button>
  </div>
</template>
