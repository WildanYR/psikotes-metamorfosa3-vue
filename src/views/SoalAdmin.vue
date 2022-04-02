<script setup>
import WidgetContainer from '../components/WidgetContainer.vue'
import PsiDropdown from '../components/PsiDropdown.vue'
import { onMounted, reactive, ref } from 'vue'
import PsiButton from '../components/PsiButton.vue'
import FormInput from '../components/FormInput.vue'
import PsiEditor from '../components/PsiEditor.vue'
import { XIcon } from '@heroicons/vue/outline'
import { getKelompokTesSoal, mutateSoal } from '../services/soalService'
import { useRoute } from 'vue-router'
import config from '../config'
import { notify } from '@kyvg/vue3-notification'
import { detailKelompokTes } from '../services/kelompokTesService'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ModalImage from '../components/ModalImage.vue'

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
const jenisSoalPgOpsi = [
  { text: 'Pilihan Ganda Y', value: 'pilgan_y' },
  { text: 'Pilihan Ganda X', value: 'pilgan_x' }
]
const jenisSoalMcOpsi = [
  { text: 'Multichoice Y', value: 'multichoice_y' },
  { text: 'Multichoice X', value: 'multichoice_x' }
]
const route = useRoute()
const loadingGet = ref(false)
const loadingMutate = ref(false)
const showImageModal = ref(false)
const kelompokTesNama = ref('')
const soalData = ref([])
const deletedSoalData = ref([])
const defaultJenisSoal = ref('')
const soalOpsiSelected = reactive({
  soal_index: 0,
  opsi_index: 0
})

const openImageModal = () => {
  showImageModal.value = true
}
const closeImageModal = () => {
  showImageModal.value = false
  if (
    !soalData.value[soalOpsiSelected.soal_index].opsi_soal[
      soalOpsiSelected.opsi_index
    ].teks
  ) {
    soalData.value[soalOpsiSelected.soal_index].opsi_soal[
      soalOpsiSelected.opsi_index
    ].type = ''
  }
  soalOpsiSelected.soal_index = 0
  soalOpsiSelected.opsi_index = 0
}
const generateImageUrl = (name) => {
  return `${config.cdnUrl}/${name}`
}
const addNewSoal = () => {
  soalData.value.push({
    nomor: '',
    teks: '',
    jenis_soal: defaultJenisSoal.value,
    kelompok_tes_id: route.params.id
  })
}
const removeSoal = (soal_index) => {
  if (soalData.value[soal_index].signature) {
    deletedSoalData.value.push({ ...soalData.value[soal_index], remove: true })
  }
  soalData.value.splice(soal_index, 1)
}
const addNewOpsi = (soal_index) => {
  if (!soalData.value[soal_index].opsi_soal) {
    soalData.value[soal_index].opsi_soal = [
      {
        teks: '',
        value: '',
        type: ''
      }
    ]
  } else {
    soalData.value[soal_index].opsi_soal.push({ teks: '', value: '', type: '' })
  }
}
const removeOpsi = (soal_index, opsi_index) => {
  soalData.value[soal_index].opsi_soal.splice(opsi_index, 1)
}
const changeOpsiType = (soal_index, opsi_index, type) => {
  soalData.value[soal_index].opsi_soal[opsi_index].type = type
  soalData.value[soal_index].opsi_soal[opsi_index].teks = ''
  if (type === 'image') {
    soalOpsiSelected.soal_index = soal_index
    soalOpsiSelected.opsi_index = opsi_index
    openImageModal()
  }
}

const handleImageSelected = (imgPath) => {
  soalData.value[soalOpsiSelected.soal_index].opsi_soal[
    soalOpsiSelected.opsi_index
  ].teks = imgPath
  closeImageModal()
}

const validateSoal = (soals) => {
  try {
    soals.forEach((soal, soal_index) => {
      if (!soal.nomor) throw { soal_index, message: 'Nomor soal harus diisi' }
      if (!soal.teks)
        throw {
          soal_index,
          message: `Soal nomor ${soal.nomor}, narasi soal harus diisi`
        }
      if (!soal.jenis_soal || !soal.kelompok_tes_id)
        throw {
          soal_index,
          message: `Terjadi error pada soal nomor ${soal.nomor} silahkan hapus dan buat ulang`
        }
      if (soal.jenis_soal === 'kelompok' && !soal.opsi_soal)
        throw {
          soal_index,
          message: `Soal nomor ${soal.nomor}, kelompok harus diisi`
        }
      if (
        ['pilgan_y', 'pilgan_x', 'multichoice_y', 'multichoice_x'].includes(
          soal.jenis_soal
        )
      ) {
        if (!soal.opsi_soal || !soal.opsi_soal.length)
          throw {
            soal_index,
            message: `Soal nomor ${soal.nomor}, opsi harus diisi`
          }
        soal.opsi_soal.forEach((op) => {
          if (!op.type || !op.value || !op.teks)
            throw {
              soal_index,
              message: `Soal nomor ${soal.nomor}, opsi harus lengkap`
            }
        })
      }
    })
    return true
  } catch (error) {
    notify({
      title: 'Soal Error',
      text: error.message,
      type: 'error'
    })
    return false
  }
}

const handleGetSoal = () => {
  loadingGet.value = true
  detailKelompokTes(route.params.id)
    .then((data) => {
      kelompokTesNama.value = data.nama
      return getKelompokTesSoal(route.params.id)
    })
    .then((data) => {
      soalData.value = data.map((soal) => ({
        ...soal,
        nomor: soal.nomor.toString()
      }))
      deletedSoalData.value = []
      if (data.length) {
        defaultJenisSoal.value = data[0].jenis_soal
      }
    })
    .finally(() => {
      loadingGet.value = false
    })
}

const handleMutateSoal = () => {
  if (!validateSoal(soalData.value)) return
  loadingMutate.value = true
  mutateSoal([...soalData.value, ...deletedSoalData.value])
    .then(() => {
      notify({
        title: 'Berhasil',
        text: 'Simpan soal berhasil',
        type: 'success'
      })
      handleGetSoal()
    })
    .finally(() => {
      loadingMutate.value = false
    })
}

onMounted(() => {
  handleGetSoal()
})
</script>

<template>
  <widget-container title="Edit Soal" :loading="loadingGet">
    <p class="mb-8 text-4xl">{{ kelompokTesNama }}</p>
    <psi-dropdown
      v-model="defaultJenisSoal"
      label="Jenis Soal Dasar"
      :items="jenisSoal"
    />
  </widget-container>
  <h2 class="text-center text-4xl font-bold">Daftar Soal</h2>
  <div v-if="loadingGet" class="flex items-center justify-center">
    <loading-spinner
      class="h-16 w-16 animate-spin fill-blue-100 text-blue-600"
    />
  </div>
  <template v-else>
    <p v-if="!defaultJenisSoal" class="text-center text-red-700">
      Silahkan pilih jenis soal dasar sebelum memasukkan soal
    </p>
    <div v-else>
      <div v-if="soalData.length" class="flex flex-col gap-10">
        <div
          v-for="(soal, i) in soalData"
          :id="`soal-${i}`"
          :key="`soal-${i}`"
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
              v-model="soal.jenis_soal"
              label="Jenis Soal"
              :items="
                defaultJenisSoal === 'pilgan_x' ||
                defaultJenisSoal === 'pilgan_y'
                  ? jenisSoalPgOpsi
                  : jenisSoalMcOpsi
              "
            />
            <psi-editor v-model="soal.teks" label="Narasi Soal" />
            <form-input
              v-if="soal.jenis_soal === 'kelompok'"
              v-model="soal.opsi_soal"
              label="Kelompok Jawaban"
            />
            <div
              v-else-if="
                [
                  'pilgan_y',
                  'pilgan_x',
                  'multichoice_y',
                  'multichoice_x'
                ].includes(soal.jenis_soal)
              "
              class="space-y-2"
            >
              <div
                v-for="(opsi, j) in soal.opsi_soal"
                :key="`${soal.id}-opsi-${j}`"
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
                <img
                  v-else-if="opsi.type === 'image'"
                  :src="generateImageUrl(opsi.teks)"
                  class="w-24"
                />
                <form-input
                  v-else
                  v-model="opsi.teks"
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
        <psi-button class="flex-1" variant="red" @click="$router.go(-1)"
          >Kembali</psi-button
        >
        <psi-button
          :loading="loadingMutate"
          class="flex-1"
          @click="handleMutateSoal"
          >Simpan Soal</psi-button
        >
      </div>
    </div>
  </template>
  <modal-image
    :show-modal="showImageModal"
    @close-modal="closeImageModal"
    @image-selected="handleImageSelected"
  ></modal-image>
</template>
