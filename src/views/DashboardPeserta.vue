<script setup>
import AlatTesBox from '../components/AlatTesBox.vue'
import WidgetGridContainer from '../components/WidgetGridContainer.vue'
import WidgetSesi from '../components/WidgetSesi.vue'
import WidgetJam from '../components/WidgetJam.vue'
import PsiButton from '../components/PsiButton.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
    <widget-sesi>Psikotes Pertama</widget-sesi>
    <div
      class="flex flex-col items-center rounded-xl bg-white p-4 shadow-md md:col-span-2"
    ></div>
    <widget-jam />
  </div>
  <widget-grid-container
    title="Daftar Alat Tes"
    description="dibawah ini adalah daftar alat tes yang bisa dikerjakan pada sesi saat
        ini"
  >
    <alat-tes-box variant="blue" alat-tes="Alat Tes 1" kelompok-tes="9"
      ><psi-button variant="black" class="w-full"
        >Kerjakan</psi-button
      ></alat-tes-box
    >
    <alat-tes-box variant="blue" alat-tes="Alat Tes 1" kelompok-tes="9"
      ><psi-button variant="black" class="w-full"
        >Kerjakan</psi-button
      ></alat-tes-box
    >
    <alat-tes-box variant="blue" alat-tes="Alat Tes 1" kelompok-tes="9"
      ><psi-button variant="black" class="w-full"
        >Kerjakan</psi-button
      ></alat-tes-box
    >
    <alat-tes-box variant="blue" alat-tes="Alat Tes 1" kelompok-tes="9"
      ><psi-button variant="black" class="w-full"
        >Kerjakan</psi-button
      ></alat-tes-box
    >
    <alat-tes-box variant="blue" alat-tes="Alat Tes 1" kelompok-tes="9"
      ><psi-button variant="black" class="w-full"
        >Kerjakan</psi-button
      ></alat-tes-box
    >
  </widget-grid-container>
</template>
