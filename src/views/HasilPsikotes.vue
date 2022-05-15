<script setup>
import { computed, onMounted, ref } from 'vue'
import WidgetContainer from '../components/WidgetContainer.vue'
import PsiAutocomplete from '../components/PsiAutocomplete.vue'
import PsiButton from '../components/PsiButton.vue'
import { getAlatTes } from '../services/alatTesService'
import { getSesi } from '../services/sesiService'
import {
  getUserPsikotes,
  getJawabanUserPsikotes
} from '../services/psikotesService'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { notify } from '@kyvg/vue3-notification'

const dataAlatTes = ref([])
const dataSesi = ref([])
const dataUser = ref(null)
const dataJawaban = ref([])
const loadingGetAlatTesSesi = ref(false)
const loadingGetUser = ref(false)
const loadingGetJawaban = ref(false)
const selectedSesi = ref(null)
const selectedAlatTes = ref(null)
const selectedUser = ref(null)
const detailSelectedUser = computed(() => {
  if (!selectedUser.value) return null
  return Object.entries(selectedUser.value.detail)
    .map((dt) => ({ key: dt[0].replace(/_/g, ' '), value: dt[1] }))
    .filter((dt) => dt.key !== 'id')
})

const handleGetAlatTesSesi = () => {
  loadingGetAlatTesSesi.value = true
  getAlatTes(true)
    .then((data) => {
      dataAlatTes.value = data.map((item) => ({
        text: item.nama,
        value: item.id
      }))
      return getSesi()
    })
    .then((data) => {
      dataSesi.value = data.map((item) => ({ text: item.nama, value: item.id }))
    })
    .finally(() => {
      loadingGetAlatTesSesi.value = false
    })
}

const handleGetUser = () => {
  if (selectedAlatTes.value && selectedSesi.value) {
    loadingGetUser.value = true
    getUserPsikotes(selectedSesi.value.value, selectedAlatTes.value.value)
      .then((data) => {
        dataUser.value = data.map((item) => ({
          text: item.nama_lengkap,
          value: item.id,
          detail: { ...item }
        }))
      })
      .finally(() => {
        loadingGetUser.value = false
      })
  }
}

const handleGetJawaban = () => {
  console.log({ selectedUser: selectedUser.value.detail })
  loadingGetJawaban.value = true
  getJawabanUserPsikotes(
    selectedSesi.value.value,
    selectedAlatTes.value.value,
    selectedUser.value.value
  )
    .then((data) => {
      dataJawaban.value = data
    })
    .finally(() => {
      loadingGetJawaban.value = false
    })
}

const handleCopyToClipboard = (index) => {
  const soal = dataJawaban.value[index].soal
  const soalStr = soal.map((s) => s.jawaban).join('\r\n')
  navigator.clipboard
    .writeText(soalStr)
    .then(() => {
      notify({
        title: 'Berhasil',
        text: 'Copy jawaban berhasil',
        type: 'success'
      })
    })
    .catch((error) => {
      console.log(error)
      notify({
        title: 'Gagal',
        text: 'Copy jawaban gagal',
        type: 'error'
      })
    })
}

onMounted(() => {
  handleGetAlatTesSesi()
})
</script>

<template>
  <widget-container
    title="Pilih Sesi dan Alat Tes"
    :loading="loadingGetAlatTesSesi || loadingGetUser"
  >
    <div class="flex items-center gap-3">
      <psi-autocomplete
        v-model="selectedSesi"
        :items="dataSesi"
        label="Sesi"
        class="flex-1"
        @update:model-value="handleGetUser()"
      />
      <psi-autocomplete
        v-model="selectedAlatTes"
        :items="dataAlatTes"
        label="Alat tes"
        class="flex-1"
        @update:model-value="handleGetUser()"
      />
    </div>
    <p v-if="!dataUser?.length" class="mt-5 text-center text-red-700">
      {{
        dataUser
          ? 'Belum ada peserta yang mengerjakan'
          : 'Pilih Sesi dan Alat Tes'
      }}
    </p>
    <psi-autocomplete
      v-else
      v-model="selectedUser"
      :items="dataUser"
      label="User"
      class="mt-5 w-full"
      @update:model-value="handleGetJawaban()"
    />
  </widget-container>
  <widget-container v-if="detailSelectedUser" title="Data Peserta">
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr
          class="rounded-lg text-left text-sm font-medium text-gray-700"
          style="font-size: 0.9674rem"
        >
          <th class="bg-gray-200 px-4 py-2" style="background-color: #f8f8f8">
            Detail
          </th>
          <th class="px-4 py-2" style="background-color: #f8f8f8">Data</th>
        </tr>
      </thead>
      <tbody class="text-sm font-normal text-gray-700">
        <tr
          v-for="detail in detailSelectedUser"
          :key="detail.key"
          class="border-b border-gray-200 py-10 hover:bg-gray-100"
        >
          <td class="px-4 py-4">{{ detail.key }}</td>
          <td class="px-4 py-4">{{ detail.value }}</td>
        </tr>
      </tbody>
    </table>
  </widget-container>
  <div v-if="loadingGetJawaban" class="flex items-center justify-center">
    <loading-spinner
      class="h-16 w-16 animate-spin fill-blue-100 text-blue-600"
    />
  </div>
  <template v-else-if="dataJawaban.length">
    <h2 class="text-center text-4xl font-bold">Jawaban Peserta</h2>
    <widget-container
      v-for="(kelompokTes, i) in dataJawaban"
      :key="'kelompok-tes-' + i"
      :title="kelompokTes.nama"
    >
      <template #cta>
        <psi-button @click="handleCopyToClipboard(i)">Copy Jawaban</psi-button>
      </template>
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr
            class="rounded-lg text-left text-sm font-medium text-gray-700"
            style="font-size: 0.9674rem"
          >
            <th class="bg-gray-200 px-4 py-2" style="background-color: #f8f8f8">
              {{ kelompokTes.jenis_soal_kelompok ? 'Kelompok' : 'Nomor' }}
            </th>
            <th class="px-4 py-2" style="background-color: #f8f8f8">
              {{ kelompokTes.jenis_soal_kelompok ? 'Jumlah' : 'Jawaban' }}
            </th>
          </tr>
        </thead>
        <tbody class="text-sm font-normal text-gray-700">
          <tr
            v-for="(soal, j) in kelompokTes.soal"
            :key="'soal-' + j"
            class="border-b border-gray-200 py-10 hover:bg-gray-100"
          >
            <td class="px-4 py-4">{{ soal.nomor }}</td>
            <td class="px-4 py-4">{{ soal.jawaban }}</td>
          </tr>
        </tbody>
      </table>
    </widget-container>
  </template>
</template>
