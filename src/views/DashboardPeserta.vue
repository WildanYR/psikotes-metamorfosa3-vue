<script setup>
import AlatTesBox from '../components/AlatTesBox.vue'
import AlatTesContainer from '../components/AlatTesContainer.vue'
import SesiContainer from '../components/SesiContainer.vue'
import WaktuContainer from '../components/WaktuContainer.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
    <sesi-container>Psikotes Pertama</sesi-container>
    <div
      class="flex flex-col items-center rounded-xl bg-white p-4 shadow-md md:col-span-2"
    ></div>
    <waktu-container />
  </div>
  <alat-tes-container
    title="Daftar Alat Tes"
    description="dibawah ini adalah daftar alat tes yang bisa dikerjakan pada sesi saat
        ini"
  >
    <alat-tes-box variant="amber"></alat-tes-box>
    <alat-tes-box variant="green"></alat-tes-box>
    <alat-tes-box variant="blue"></alat-tes-box>
    <alat-tes-box variant="violet"></alat-tes-box>
    <alat-tes-box variant="rose"></alat-tes-box>
  </alat-tes-container>
</template>
