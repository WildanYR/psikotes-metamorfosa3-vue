<script setup>
import { computed, onMounted, ref } from 'vue'
import PsiButton from '../components/PsiButton.vue'
import PsikotesNavbar from '../components/PsikotesNavbar.vue'
import PsikotesPilgan from '../components/PsikotesPilgan.vue'
import FormInput from '../components/FormInput.vue'
import PsikotesAngka from '../components/PsikotesAngka.vue'
import PsikotesMultichoice from '../components/PsikotesMultichoice.vue'
import PsikotesOpini from '../components/PsikotesOpini.vue'
import PsikotesKelompok from '../components/PsikotesKelompok.vue'
import { useRouter } from 'vue-router'
import { usePsikotesStore } from '../stores/psikotes'
import { notify } from '@kyvg/vue3-notification'
import { submitJawaban } from '../services/psikotesService'

const router = useRouter()
const psikotesStore = usePsikotesStore()

const loadingSubmit = ref(false)
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
    waktu: kelompokTes.waktu
  }
})
const soalData = computed(
  () =>
    psikotesStore.alat_tes.kelompok_tes[psikotesStore.kelompok_tes_index].soal
)
const lastKelompokTes = computed(
  () =>
    psikotesStore.kelompok_tes_index ===
    psikotesStore.alat_tes.kelompok_tes.length - 1
)
const progresMengerjakan = computed(() => {
  let soalDikerjakan = psikotesStore.jawaban.filter(
    (jwb) => !!jwb.jawaban
  ).length - psikotesStore.jumlah_terjawab
  return {
    jumlahSoal:
      psikotesStore.alat_tes.kelompok_tes[psikotesStore.kelompok_tes_index].soal
        .length || 1,
    soalDikerjakan
  }
})

const getJawaban = (id) => {
  const jawabanIndex = psikotesStore.jawaban.findIndex((jwb) => jwb.id === id)
  if (jawabanIndex < 0) {
    return ''
  }
  return psikotesStore.jawaban[jawabanIndex].jawaban
}
const handleJawab = (id, jawaban) => {
  if (!psikotesStore.lock) {
    console.log({jawaban})
    const jawabanIndex = psikotesStore.jawaban.findIndex((jwb) => jwb.id === id)
    if (jawabanIndex < 0) {
      psikotesStore.jawaban.push({ id, jawaban })
    } else {
      psikotesStore.jawaban[jawabanIndex].jawaban = jawaban
    }
  }
}

const handleSelesai = () => {
  if (lastKelompokTes.value) {
    // submit psikotes
    loadingSubmit.value = true
    psikotesStore.lock = true
    submitJawaban(alatTesData.value.id, psikotesStore.jawaban)
      .then(() => {
        if (psikotesStore.timer) clearInterval(psikotesStore.timer)
        psikotesStore.resetState()
        router.push({ name: 'dashboard_peserta' })
        notify({
          title: 'Selesai',
          text: 'Selamat anda telah menyelesaikan psikotes',
          type: 'success'
        })
      })
      .finally(() => {
        loadingSubmit.value = false
      })
  } else {
    psikotesStore.kelompok_tes_index = psikotesStore.kelompok_tes_index + 1
    clearInterval(psikotesStore.timer)
    psikotesStore.timer_start = 0
    psikotesStore.jumlah_terjawab = psikotesStore.jawaban.length
    router.push({ name: 'psikotes_petunjuk' })
  }
}

onMounted(() => {
  if (!psikotesStore.lock && kelompokTesData.value.waktu) {
    if (psikotesStore.timer) {
      clearInterval(psikotesStore.timer)
    } else {
      psikotesStore.timer_start = Date.now()
    }
    psikotesStore.timer = setInterval(() => {
      const dateNow = Date.now()
      const timer_end =
        psikotesStore.timer_start + kelompokTesData.value.waktu * 60000
      console.log('timer countdown = ', (timer_end - dateNow)/1000)
      if (dateNow >= timer_end) {
        clearInterval(psikotesStore.timer)
        psikotesStore.timer_start = 0
        notify({
          title: 'Waktu Habis',
          text: 'Waktu mengerjakan kelompok tes telah habis',
          type: 'warning'
        })
        handleSelesai()
      }
    }, 1000)
  }
})
</script>

<template>
  <div class="relative">
    <psikotes-navbar
      :alat-tes="alatTesData.nama"
      :kelompok-tes="kelompokTesData.nama"
      :timer="!!psikotesStore.timer_start"
      :soal-dikerjakan="progresMengerjakan.soalDikerjakan"
      :jumlah-soal="progresMengerjakan.jumlahSoal"
      class="mb-5"
    ></psikotes-navbar>
    <div class="flex flex-col gap-2">
      <div
        v-for="soal in soalData"
        :key="soal.id"
        class="rounded-lg bg-white px-10 py-5 shadow-xl"
      >
        <div class="mx-auto max-w-4xl">
          <p class="mb-4 text-sm text-gray-500">Soal Nomor {{ soal.nomor }}</p>
          <div class="psi-editor max-w-full" v-html="soal.teks"></div>
          <div class="mx-auto mt-7 max-w-4xl">
            <psikotes-pilgan
              v-if="
                soal.jenis_soal === 'pilgan_y' || soal.jenis_soal === 'pilgan_x'
              "
              :model-value="getJawaban(soal.id)"
              :opsi="soal.opsi_soal"
              :direction="soal.jenis_soal === 'pilgan_y' ? 'y' : 'x'"
              @update:model-value="(val) => handleJawab(soal.id, val)"
            ></psikotes-pilgan>
            <form-input
              v-else-if="soal.jenis_soal === 'uraian'"
              :model-value="getJawaban(soal.id)"
              label="Jawaban"
              @update:model-value="(val) => handleJawab(soal.id, val)"
            />
            <psikotes-angka
              v-else-if="soal.jenis_soal === 'angka'"
              :model-value="getJawaban(soal.id)"
              @update:model-value="(val) => handleJawab(soal.id, val)"
            />
            <psikotes-multichoice
              v-else-if="
                soal.jenis_soal === 'multichoice_y' ||
                soal.jenis_soal === 'multichoice_x'
              "
              :model-value="getJawaban(soal.id)"
              :opsi="soal.opsi_soal"
              :direction="soal.jenis_soal === 'multichoice_y' ? 'y' : 'x'"
              @update:model-value="(val) => handleJawab(soal.id, val)"
            />
            <psikotes-opini
              v-else-if="soal.jenis_soal === 'opini'"
              :model-value="getJawaban(soal.id)"
              @update:model-value="(val) => handleJawab(soal.id, val)"
            />
            <psikotes-kelompok
              v-else-if="soal.jenis_soal === 'kelompok'"
              :model-value="getJawaban(soal.id)"
              :opsi="soal.opsi_soal"
              @update:model-value="(val) => handleJawab(soal.id, val)"
            />
            <div
              v-else-if="soal.jenis_soal === 'membaca'"
              class="text-center text-gray-500"
            >
              tidak perlu jawaban
            </div>
            <div v-else class="text-center text-gray-500">
              Jenis soal tidak terdaftar, silahkan hubungi admin
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <psi-button :loading="loadingSubmit" @click="handleSelesai">{{
          lastKelompokTes ? 'Selesai' : 'Lanjut Kelompok Tes Berikutnya'
        }}</psi-button>
      </div>
    </div>
  </div>
</template>
