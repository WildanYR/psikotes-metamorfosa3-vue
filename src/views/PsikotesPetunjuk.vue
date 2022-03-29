<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PsiButton from '../components/PsiButton.vue'
import { usePsikotesStore } from '../stores/psikotes'
import config from '../config'

const router = useRouter()
const psikotesStore = usePsikotesStore()

const alatTesData = computed(() => ({
  id: psikotesStore.alat_tes.id,
  nama: psikotesStore.alat_tes.nama
}))
const kelompokTesData = computed(() => {
  const kelompokTes =
    psikotesStore.alat_tes.kelompok_tes[psikotesStore.kelompok_tes_index]
  return {
    id: kelompokTes.id,
    nama: kelompokTes.nama,
    petunjuk: kelompokTes.petunjuk.replace(/==cdn_url==/g, config.cdnUrl),
    waktu: kelompokTes.waktu
  }
})

const handleKerjakanTes = () => {
  if (!psikotesStore.timer_start && kelompokTesData.value.waktu) {
    psikotesStore.timer_start = Date.now()
  }
  router.push({ name: 'psikotes_soal' })
}
</script>

<template>
  <div class="rounded-lg bg-white p-10 shadow-xl">
    <div class="mb-10 space-y-1 text-center">
      <h1 class="text-4xl font-bold">Petunjuk Mengerjakan Psikotes</h1>
      <p class="text-2xl">{{ alatTesData.nama }}</p>
      <p class="">{{ kelompokTesData.nama }}</p>
    </div>
    <div
      class="psi-editor mx-auto max-w-4xl"
      v-html="kelompokTesData.petunjuk"
    ></div>
    <div class="mt-10 flex justify-center">
      <psi-button @click="handleKerjakanTes">Kerjakan Psikotes</psi-button>
    </div>
  </div>
</template>
