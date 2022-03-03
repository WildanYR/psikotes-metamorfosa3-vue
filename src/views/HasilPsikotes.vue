<script setup>
import { ref } from 'vue'
import WidgetContainer from '../components/WidgetContainer.vue'
import PsiAutocomplete from '../components/PsiAutocomplete.vue'
import PsiButton from '../components/PsiButton.vue'

const daftarSesi = ref([
  { text: 'Desember 2021', value: '1' },
  { text: 'Januari 2022', value: '2' },
  { text: 'Februari 2022', value: '3' },
  { text: 'Maret 2022', value: '4' },
  { text: 'April 2022', value: '5' }
])
const daftarAlatTes = ref([
  { text: 'Alat Tes 1', value: '1' },
  { text: 'Alat Tes 2', value: '2' },
  { text: 'Alat Tes 3', value: '3' },
  { text: 'Alat Tes 4', value: '4' },
  { text: 'Alat Tes 5', value: '5' }
])
const daftarUser = ref([
  { text: 'User 1', value: '1' },
  { text: 'User 2', value: '2' },
  { text: 'User 3', value: '3' },
  { text: 'User 4', value: '4' },
  { text: 'User 5', value: '5' }
])
const selectedSesi = ref(null)
const selectedAlatTes = ref(null)
const selectedUser = ref(null)
</script>

<template>
  <widget-container title="Pilih Sesi dan Alat Tes">
    <div class="flex items-center gap-3">
      <psi-autocomplete
        v-model="selectedSesi"
        :items="daftarSesi"
        label="Sesi"
        class="flex-1"
      />
      <psi-autocomplete
        v-model="selectedAlatTes"
        :items="daftarAlatTes"
        label="Alat tes"
        class="flex-1"
      />
    </div>
    <p
      v-if="!selectedSesi || !selectedAlatTes"
      class="mt-5 text-center text-red-700"
    >
      Pilih Sesi dan Alat Tes
    </p>
    <psi-autocomplete
      v-else
      v-model="selectedUser"
      :items="daftarUser"
      label="User"
      class="mt-5 w-full"
    />
  </widget-container>
  <template v-if="!!selectedUser">
    <h2 class="text-center text-4xl font-bold">Jawaban Peserta</h2>
    <widget-container title="Kelompok Tes 1">
      <template #cta>
        <psi-button>Copy Jawaban</psi-button>
      </template>
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr
            class="rounded-lg text-left text-sm font-medium text-gray-700"
            style="font-size: 0.9674rem"
          >
            <th class="bg-gray-200 px-4 py-2" style="background-color: #f8f8f8">
              Nomor
            </th>
            <th class="px-4 py-2" style="background-color: #f8f8f8">Jawaban</th>
          </tr>
        </thead>
        <tbody class="text-sm font-normal text-gray-700">
          <tr class="border-b border-gray-200 py-10 hover:bg-gray-100">
            <td class="px-4 py-4">1</td>
            <td class="px-4 py-4">A</td>
          </tr>
          <tr class="border-b border-gray-200 py-4 hover:bg-gray-100">
            <td class="px-4 py-4">2</td>
            <td class="px-4 py-4">B</td>
          </tr>
          <tr class="border-gray-200 hover:bg-gray-100">
            <td class="px-4 py-4">3</td>
            <td class="px-4 py-4">C</td>
          </tr>
        </tbody>
      </table>
    </widget-container>
    <widget-container title="Kelompok Tes 2">
      <template #cta>
        <psi-button>Copy Jawaban</psi-button>
      </template>
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr
            class="rounded-lg text-left text-sm font-medium text-gray-700"
            style="font-size: 0.9674rem"
          >
            <th class="bg-gray-200 px-4 py-2" style="background-color: #f8f8f8">
              Kelompok
            </th>
            <th class="px-4 py-2" style="background-color: #f8f8f8">Jumlah</th>
          </tr>
        </thead>
        <tbody class="text-sm font-normal text-gray-700">
          <tr class="border-b border-gray-200 py-10 hover:bg-gray-100">
            <td class="px-4 py-4">Singa</td>
            <td class="px-4 py-4">10</td>
          </tr>
          <tr class="border-b border-gray-200 py-4 hover:bg-gray-100">
            <td class="px-4 py-4">Kijang</td>
            <td class="px-4 py-4">1</td>
          </tr>
          <tr class="border-gray-200 hover:bg-gray-100">
            <td class="px-4 py-4">Elang</td>
            <td class="px-4 py-4">5</td>
          </tr>
        </tbody>
      </table>
    </widget-container>
  </template>
</template>
