<script setup>
import AlatTesBox from '../components/AlatTesBox.vue'
import WidgetGridContainer from '../components/WidgetGridContainer.vue'
import PsiButton from '../components/PsiButton.vue'
import { useRouter } from 'vue-router'
import PsiModal from '../components/PsiModal.vue'
import { onMounted, reactive, ref } from 'vue'
import FormInput from '../components/FormInput.vue'
import {
  getAlatTes,
  addAlatTes,
  deleteAlatTes
} from '../services/alatTesService'
import { notify } from '@kyvg/vue3-notification'
import FormValidator from '../helpers/formValidation'

const router = useRouter()

const showAddModal = ref(false)
const showDeleteModal = ref(false)
const loadingGetAlatTes = ref(false)
const loadingAddAlatTes = ref(false)
const loadingDeleteAlatTes = ref(false)
const dataAlatTes = ref([])
const selectedAlatTes = reactive({
  id: '',
  nama: ''
})
const formAdd = reactive({ nama: '', sort_index: '0' })
const formAddValidation = reactive({
  nama: { invalid: false, errorMessage: [] }
})

const redirectEdit = (id) => {
  router.push({ name: 'alat_tes_edit_admin', params: { id } })
}
const openAddModal = () => {
  showAddModal.value = true
}
const closeAddModal = () => {
  showAddModal.value = false
}
const openDeleteModal = (alatTes) => {
  selectedAlatTes.id = alatTes.id
  selectedAlatTes.nama = alatTes.nama
  showDeleteModal.value = true
}
const closeDeleteModal = () => {
  selectedAlatTes.id = ''
  selectedAlatTes.nama = ''
  showDeleteModal.value = false
}
const handleGet = () => {
  loadingGetAlatTes.value = true
  getAlatTes()
    .then((data) => {
      dataAlatTes.value = data
    })
    .finally(() => {
      loadingGetAlatTes.value = false
    })
}
const handleAdd = () => {
  formAddValidation.nama = new FormValidator(formAdd.nama).isRequired()
  if (formAddValidation.nama.invalid) {
    return
  }
  loadingAddAlatTes.value = true
  addAlatTes(formAdd.nama, +formAdd.sort_index)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      closeAddModal()
      return handleGet()
    })
    .finally(() => {
      loadingAddAlatTes.value = false
    })
}
const handleDelete = () => {
  loadingDeleteAlatTes.value = true
  deleteAlatTes(selectedAlatTes.id)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      closeDeleteModal()
      return handleGet()
    })
    .finally(() => {
      loadingDeleteAlatTes.value = false
    })
}
onMounted(() => {
  handleGet()
})
</script>

<template>
  <widget-grid-container
    title="Daftar Alat Tes"
    description="dibawah ini adalah daftar semua alat tes"
    :loading="loadingGetAlatTes"
  >
    <template #cta>
      <psi-button @click="openAddModal">Tambah Alat Tes</psi-button>
    </template>
    <alat-tes-box
      v-for="alatTes in dataAlatTes"
      :key="alatTes.id"
      :title="alatTes.nama"
      :subtitle="`${alatTes.kelompok_tes_count} Kelompok Tes`"
      variant="blue"
    >
      <div class="flex w-full items-center gap-3">
        <psi-button
          class="w-full"
          variant="amber"
          @click="redirectEdit(alatTes.id)"
          >Edit</psi-button
        >
        <psi-button
          class="w-full"
          variant="red"
          @click="openDeleteModal(alatTes)"
          >Hapus</psi-button
        >
      </div>
    </alat-tes-box>
  </widget-grid-container>

  <psi-modal
    size="2xl"
    title="Tambah Alat Tes"
    :show-modal="showAddModal"
    @close-modal="closeAddModal"
  >
    <div class="space-y-4">
      <form-input
        v-model="formAdd.nama"
        label="Nama"
        :error-message="formAddValidation.nama.errorMessage"
      />
      <form-input
        v-model="formAdd.sort_index"
        label="Sort Index"
        type="number"
      />
    </div>
    <div class="mt-3 flex items-center justify-end gap-3">
      <psi-button variant="black" @click="closeAddModal">Batal</psi-button>
      <psi-button :loading="loadingAddAlatTes" @click="handleAdd"
        >Tambah</psi-button
      >
    </div>
  </psi-modal>
  <psi-modal
    size="xl"
    title="Hapus Alat Tes"
    :show-modal="showDeleteModal"
    @close-modal="closeDeleteModal"
  >
    <p>Apakah anda yakin ingin menghapus {{ selectedAlatTes.nama }}</p>
    <p class="text-sm text-red-600">
      Menghapus alat tes berarti menghapus kelompok tes, soal, dan jawaban
      peserta
    </p>
    <div class="mt-3 flex items-center justify-end gap-3">
      <psi-button variant="black" @click="closeDeleteModal">Batal</psi-button>
      <psi-button
        variant="red"
        :loading="loadingDeleteAlatTes"
        @click="handleDelete"
        >Hapus</psi-button
      >
    </div>
  </psi-modal>
</template>
