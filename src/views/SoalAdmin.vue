<script setup>
import WidgetContainer from '../components/WidgetContainer.vue'
import PsiDropdown from '../components/PsiDropdown.vue'
import { ref } from 'vue'
import PsiButton from '../components/PsiButton.vue'
import FormInput from '../components/FormInput.vue'
import PsiEditor from '../components/PsiEditor.vue'
import { XIcon } from '@heroicons/vue/outline'

const jenisSoal = [
  { text: 'Pilihan Ganda Y', value: 'pilgan_y' },
  { text: 'Pilihan Ganda X', value: 'pilgan_x' },
  { text: 'Multichoice Y', value: 'multichoice_y' },
  { text: 'Multichoice X', value: 'multichoice_x' },
  { text: 'Uraian', value: 'uraian' },
  { text: 'Pilihan Angka', value: 'angka' },
  { text: 'Opini', value: 'opini' },
  { text: 'Pengelompokan Jawaban', value: 'kelompok' },
  { text: 'Membaca', value: 'membaca' }
]
const jenisSoalOpsi = [
  { text: 'Pilihan Ganda Y', value: 'pilgan_y' },
  { text: 'Pilihan Ganda X', value: 'pilgan_x' },
  { text: 'Multichoice Y', value: 'multichoice_y' },
  { text: 'Multichoice X', value: 'multichoice_x' }
]

const dummySoal = ref([])

const defaultJenisSoal = ref('')

const addNewSoal = () => {
  dummySoal.value.push({
    nomor: '',
    soal: '',
    tipe_soal: defaultJenisSoal.value
  })
}
const removeSoal = (soal_index) => {
  dummySoal.value.splice(soal_index, 1)
}
const addNewOpsi = (soal_index) => {
  if (!dummySoal.value[soal_index].opsi) {
    dummySoal.value[soal_index].opsi = [
      {
        text: '',
        value: '',
        type: ''
      }
    ]
  } else {
    dummySoal.value[soal_index].opsi.push({ text: '', value: '' })
  }
}
const removeOpsi = (soal_index, opsi_index) => {
  dummySoal.value[soal_index].opsi.splice(opsi_index, 1)
}
const changeOpsiType = (soal_index, opsi_index, type) => {
  dummySoal.value[soal_index].opsi[opsi_index].type = type
  // for development only
  if (type === 'image') {
    dummySoal.value[soal_index].opsi[opsi_index].text =
      '<img src="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg" style="width: 6rem;" />'
  } else {
    dummySoal.value[soal_index].opsi[opsi_index].text = ''
  }
}
</script>

<template>
  <widget-container title="Edit Soal">
    <p class="mb-8 text-4xl">Kelompok tes 1</p>
    <psi-dropdown
      v-model="defaultJenisSoal"
      label="Jenis Soal Dasar"
      :items="jenisSoal"
    />
  </widget-container>
  <h2 class="text-center text-4xl font-bold">Daftar Soal</h2>
  <p v-if="!defaultJenisSoal" class="text-center text-red-700">
    Silahkan pilih jenis soal dasar sebelum memasukkan soal
  </p>
  <div v-else>
    <div v-if="dummySoal.length" class="flex flex-col gap-10">
      <div
        v-for="(soal, i) in dummySoal"
        :key="i"
        class="rounded-lg bg-white p-10 shadow-xl"
      >
        <div class="mx-auto max-w-4xl space-y-5">
          <form-input v-model="soal.nomor" label="Nomor Soal" type="number" />
          <psi-dropdown
            v-if="
              [
                'pilgan_y',
                'pilgan_x',
                'multichoice_y',
                'multichoice_x'
              ].includes(defaultJenisSoal)
            "
            v-model="soal.tipe_soal"
            label="Jenis Soal"
            :items="jenisSoalOpsi"
          />
          <psi-editor v-model="soal.soal" label="Narasi Soal" />
          <form-input
            v-if="soal.tipe_soal === 'kelompok'"
            v-model="soal.opsi"
            label="Kelompok Jawaban"
          />
          <div
            v-else-if="
              [
                'pilgan_y',
                'pilgan_x',
                'multichoice_y',
                'multichoice_x'
              ].includes(soal.tipe_soal)
            "
            class="space-y-2"
          >
            <div
              v-for="(opsi, j) in soal.opsi"
              :key="`${i}-${j}`"
              class="flex items-center gap-2"
            >
              <psi-button variant="red-outline" @click="removeOpsi(i, j)"
                ><x-icon class="h-5 w-5"
              /></psi-button>
              <form-input v-model="opsi.value" label="Opsi" />
              <div v-if="!opsi.type" class="flex items-center gap-3">
                <psi-button @click="changeOpsiType(i, j, 'text')"
                  >Teks</psi-button
                >
                <psi-button @click="changeOpsiType(i, j, 'image')"
                  >gambar</psi-button
                >
              </div>
              <div v-else-if="opsi.type === 'image'" v-html="opsi.text"></div>
              <form-input
                v-else
                v-model="opsi.text"
                label="Narasi"
                class="flex-1"
              />
            </div>
            <psi-button class="mt-7 w-full" @click="addNewOpsi(i)"
              >Tambah Opsi</psi-button
            >
          </div>
          <div v-else class="text-center text-gray-500">
            Jenis soal tidak membutuhkan opsi
          </div>
          <psi-button
            variant="red-outline"
            class="w-full"
            @click="removeSoal(i)"
            >Hapus Soal</psi-button
          >
        </div>
      </div>
    </div>
    <psi-button variant="black" class="mt-6 w-full" @click="addNewSoal"
      >Tambah Soal</psi-button
    >
    <div class="mt-6 flex items-center gap-4">
      <psi-button class="flex-1" variant="red">Kembali</psi-button>
      <psi-button class="flex-1">Simpan Soal</psi-button>
    </div>
  </div>
</template>
