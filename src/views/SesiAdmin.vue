<script setup>
import WidgetGridContainer from '../components/WidgetGridContainer.vue'
import PsiButton from '../components/PsiButton.vue'
import SesiBox from '../components/SesiBox.vue'
import AlatTesBox from '../components/AlatTesBox.vue'
import PsiModal from '../components/PsiModal.vue'
import { onMounted, reactive, ref } from 'vue'
import FormInput from '../components/FormInput.vue'
import {
  getSesi,
  addSesi,
  setSesiAktif,
  deleteSesi,
  resetSesi
} from '../services/sesiService'
import { getAlatTes, setAlatTesAktif } from '../services/alatTesService'
import { notify } from '@kyvg/vue3-notification'
import FormValidator from '../helpers/formValidation'

const loadingGet = ref(false)
const loadingAdd = ref(false)
const loadingDelete = ref(false)
const loadingReset = ref(false)
const loadingSetAktif = ref(false)
const loadingSetAktifAlatTes = ref(false)
const showAddModal = ref(false)
const sesiData = ref([])
const alatTesData = ref([])
const formSesi = reactive({ nama: '' })
const formSesiValidator = reactive({ nama: '' })

const openAddModal = () => {
  showAddModal.value = true
}
const closeAddModal = () => {
  if (loadingAdd.value) return
  showAddModal.value = false
  formSesi.nama = ''
}

const handleGetSesi = () => {
  loadingGet.value = true
  getSesi()
    .then((data) => {
      sesiData.value = data.map((item) => ({
        ...item,
        aktif: item.aktif === '1'
      }))
      return getAlatTes()
    })
    .then((data) => {
      alatTesData.value = data
    })
    .finally(() => {
      loadingGet.value = false
    })
}

const handleAddSesi = () => {
  formSesiValidator.nama = new FormValidator(formSesi.nama).isRequired()
  if (formSesiValidator.nama.invalid) return
  loadingAdd.value = true
  addSesi(formSesi.nama)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetSesi()
    })
    .finally(() => {
      loadingAdd.value = false
      closeAddModal()
    })
}

const handleDeleteSesi = (id) => {
  loadingDelete.value = true
  deleteSesi(id)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetSesi()
    })
    .finally(() => {
      loadingDelete.value = false
    })
}

const handleSetSesiAktif = (id) => {
  loadingSetAktif.value = true
  setSesiAktif(id)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetSesi()
    })
    .finally(() => {
      loadingSetAktif.value = false
    })
}

const handleResetSesi = () => {
  loadingReset.value = true
  resetSesi()
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetSesi()
    })
    .finally(() => {
      loadingReset.value = false
    })
}

const handleSetAlatTesAktif = (id, aktif) => {
  loadingSetAktifAlatTes.value = true
  setAlatTesAktif(id, !aktif)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetSesi()
    })
    .finally(() => {
      loadingSetAktifAlatTes.value = false
    })
}

onMounted(() => {
  handleGetSesi()
})
</script>

<template>
  <widget-grid-container
    id="sesi-aktif"
    title="Daftar Sesi"
    :loading="loadingGet"
  >
    <template #cta>
      <div class="flex items-center gap-2">
        <a
          href="#alat-tes-aktif"
          class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800 disabled:bg-blue-200 disabled:text-blue-600"
          >Setting Alat Tes Aktif</a
        >
        <psi-button @click="openAddModal">Tambah Sesi</psi-button>
        <psi-button
          variant="black"
          :loading="loadingReset"
          @click="handleResetSesi"
          >Reset Sesi</psi-button
        >
      </div>
    </template>
    <sesi-box
      v-for="sesi in sesiData"
      :key="sesi.id"
      :label="sesi.nama"
      :active="!!sesi.aktif"
      :loading-select="loadingSetAktif"
      :loading-delete="loadingDelete"
      @on-selected="handleSetSesiAktif(sesi.id)"
      @on-delete="handleDeleteSesi(sesi.id)"
    />
  </widget-grid-container>
  <widget-grid-container
    id="alat-tes-aktif"
    title="Alat Tes Aktif"
    :loading="loadingGet"
  >
    <template #cta>
      <a
        href="#sesi-aktif"
        class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800 disabled:bg-blue-200 disabled:text-blue-600"
        >Setting Sesi Aktif</a
      >
    </template>
    <alat-tes-box
      v-for="alatTes in alatTesData"
      :key="alatTes.id"
      :variant="alatTes.aktif ? 'blue' : 'gray'"
      :title="alatTes.nama"
      :subtitle="alatTes.aktif ? 'Aktif' : 'Tidak Aktif'"
    >
      <psi-button
        variant="black"
        :loading="loadingSetAktifAlatTes"
        class="w-full"
        @click="handleSetAlatTesAktif(alatTes.id, alatTes.aktif)"
        >Pilih</psi-button
      >
    </alat-tes-box>
  </widget-grid-container>

  <psi-modal
    size="2xl"
    title="Tambah Sesi"
    :show-modal="showAddModal"
    @close-modal="closeAddModal"
  >
    <form-input
      v-model="formSesi.nama"
      label="Nama"
      :error-message="formSesiValidator.nama.errorMessage"
    />
    <div class="mt-3 flex items-center justify-end gap-3">
      <psi-button variant="black" @click="closeAddModal">Batal</psi-button>
      <psi-button :loading="loadingAdd" @click="handleAddSesi"
        >Tambah</psi-button
      >
    </div>
  </psi-modal>
</template>
