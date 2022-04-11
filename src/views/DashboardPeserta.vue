<script setup>
import AlatTesBox from '../components/AlatTesBox.vue'
import WidgetGridContainer from '../components/WidgetGridContainer.vue'
import WidgetSesi from '../components/WidgetSesi.vue'
import WidgetJam from '../components/WidgetJam.vue'
import PsiButton from '../components/PsiButton.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { onMounted, reactive, ref } from 'vue'
import { getPsikotes, getPsikotesStatus } from '../services/psikotesService'
import { useRouter } from 'vue-router'
import { usePsikotesStore } from '../stores/psikotes'

const router = useRouter()
const psikotesStore = usePsikotesStore()

const loadingGetStatus = ref(false)
const loadingKerjakan = ref(false)
const alatTesData = ref([])
const sesiData = reactive({ id: '', nama: '' })
const psikotesActive = ref(false)

const handleGetStatus = () => {
  loadingGetStatus.value = true
  getPsikotesStatus()
    .then((data) => {
      if (data.sesi) {
        alatTesData.value = data.alat_tes
        sesiData.id = data.sesi.id
        sesiData.nama = data.sesi.nama
        psikotesActive.value = true
      } else {
        psikotesActive.value = false
      }
    })
    .finally(() => {
      loadingGetStatus.value = false
    })
}

const handleKerjakan = (alat_tes_id) => {
  loadingKerjakan.value = true
  getPsikotes(alat_tes_id)
    .then((data) => {
      // persist in store, route to petunjuk
      psikotesStore.alat_tes = data
      psikotesStore.kelompok_tes_index = 0
      psikotesStore.mengerjakan = true
      router.push({ name: 'psikotes_petunjuk' })
    })
    .finally(() => (loadingKerjakan.value = false))
}

onMounted(() => {
  handleGetStatus()
})
</script>

<template>
  <div v-if="loadingGetStatus" class="flex items-center justify-center">
    <loading-spinner
      class="h-16 w-16 animate-spin fill-blue-100 text-blue-600"
    />
  </div>
  <template v-else-if="psikotesActive">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <widget-sesi>{{ sesiData.nama }}</widget-sesi>
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
      <alat-tes-box
        v-for="alatTes in alatTesData"
        :key="alatTes.id"
        :variant="alatTes.selesai ? 'green' : 'blue'"
        :title="alatTes.nama"
      >
        <p v-if="alatTes.selesai" class="text-green-900">Telah dikerjakan</p>
        <psi-button
          v-else
          variant="black"
          :loading="loadingKerjakan"
          class="w-full"
          @click="handleKerjakan(alatTes.id)"
          >Kerjakan</psi-button
        >
      </alat-tes-box>
    </widget-grid-container>
  </template>
  <div v-else class="flex items-center justify-center">
    <h2 class="text-3xl font-medium text-red-300">
      Sesi Psikotes tidak dilaksanakan
    </h2>
  </div>
</template>
