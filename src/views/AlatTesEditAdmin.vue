<script setup>
import AlatTesBox from '../components/AlatTesBox.vue'
import WidgetGridContainer from '../components/WidgetGridContainer.vue'
import PsiButton from '../components/PsiButton.vue'
import WidgetContainer from '../components/WidgetContainer.vue'
import FormInput from '../components/FormInput.vue'
import { useRouter, useRoute } from 'vue-router'
import PsiModal from '../components/PsiModal.vue'
import { onMounted, reactive, ref } from 'vue'
import { detailAlatTes, updateAlatTes } from '../services/alatTesService'
import { deleteKelompokTes } from '../services/kelompokTesService'
import { notify } from '@kyvg/vue3-notification'
import FormValidator from '../helpers/formValidation'

const router = useRouter()
const route = useRoute()
const showDeleteModal = ref(false)
const loadingGetDetail = ref(false)
const loadingUpdateAlatTes = ref(false)
const loadingDeleteKelompokTes = ref(false)
const selectedKelompokTes = reactive({ id: '', nama: '' })
const dataAlatTes = reactive({ id: '', nama: '' })
const dataKelompokTes = ref([])
const formAlatTes = reactive({ nama: '', sort_index: '0' })
const formAlatTesValidation = reactive({
  nama: { invalid: false, errorMessage: [] }
})

const openDeleteModal = (kelompokTes) => {
  selectedKelompokTes.id = kelompokTes.id
  selectedKelompokTes.nama = kelompokTes.nama
  showDeleteModal.value = true
}
const closeDeleteModal = () => {
  selectedKelompokTes.id = ''
  selectedKelompokTes.nama = ''
  showDeleteModal.value = false
}

const redirectAddKelompokTes = () => {
  router.push({
    name: 'kelompok_tes_add_admin',
    params: { alatTesId: route.params.id }
  })
}
const redirectEditKelompokTes = (id) => {
  router.push({
    name: 'kelompok_tes_edit_admin',
    params: { alatTesId: route.params.id, id }
  })
}
const redirectEditSoal = (id) => {
  router.push({
    name: 'kelompok_tes_soal_admin',
    params: { alatTesId: route.params.id, id }
  })
}

const handleGetDetail = () => {
  loadingGetDetail.value = true
  detailAlatTes(route.params.id)
    .then((data) => {
      dataAlatTes.id = data.id
      dataAlatTes.nama = data.nama
      formAlatTes.nama = data.nama
      formAlatTes.sort_index = data.sort_index.toString()
      dataKelompokTes.value = data.kelompok_tes
    })
    .finally(() => {
      loadingGetDetail.value = false
    })
}
const handleUpdateAlatTes = () => {
  if (!dataAlatTes.id) {
    return
  }
  formAlatTesValidation.nama = new FormValidator(formAlatTes.nama).isRequired()
  if (formAlatTesValidation.nama.invalid) {
    return
  }
  loadingUpdateAlatTes.value = true
  updateAlatTes(dataAlatTes.id, formAlatTes.nama, formAlatTes.sort_index)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetDetail()
    })
    .finally(() => {
      loadingUpdateAlatTes.value = false
    })
}
const handleDeleteKelompokTes = () => {
  loadingDeleteKelompokTes.value = true
  deleteKelompokTes(selectedKelompokTes.id)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      closeDeleteModal()
      handleGetDetail()
    })
    .finally(() => {
      loadingDeleteKelompokTes.value = false
    })
}

onMounted(() => {
  handleGetDetail()
})
</script>

<template>
  <widget-container title="Detail Alat Tes" :loading="loadingGetDetail">
    <div class="space-y-4">
      <form-input
        v-model="formAlatTes.nama"
        label="Nama"
        :error-message="formAlatTesValidation.nama.errorMessage"
      />
      <form-input
        v-model="formAlatTes.sort_index"
        label="Urutan"
        type="number"
      />
    </div>
    <div class="mt-3 flex items-center justify-center gap-3">
      <psi-button variant="red" @click="$router.go(-1)">Kembali</psi-button>
      <psi-button :loading="loadingUpdateAlatTes" @click="handleUpdateAlatTes"
        >Ubah</psi-button
      >
    </div>
  </widget-container>
  <widget-grid-container
    title="Daftar Kelompok Tes"
    :loading="loadingGetDetail"
  >
    <template #cta>
      <psi-button @click="redirectAddKelompokTes"
        >Tambah Kelompok Tes</psi-button
      >
    </template>
    <alat-tes-box
      v-for="kelompokTes in dataKelompokTes"
      :key="kelompokTes.id"
      label="Kelompok Tes"
      :title="kelompokTes.nama"
      :subtitle="`${kelompokTes.soal_count} Soal`"
      variant="violet"
    >
      <div class="flex w-full items-center gap-3">
        <psi-button
          class="w-full"
          variant="amber"
          @click="redirectEditKelompokTes(kelompokTes.id)"
          >Edit</psi-button
        >
        <psi-button
          class="w-full"
          variant="red"
          @click="openDeleteModal(kelompokTes)"
          >Hapus</psi-button
        >
      </div>
      <psi-button class="mt-3 w-full" @click="redirectEditSoal(kelompokTes.id)"
        >Soal</psi-button
      >
    </alat-tes-box>
  </widget-grid-container>

  <psi-modal
    size="xl"
    title="Hapus Kelompok Tes"
    :show-modal="showDeleteModal"
    @close-modal="closeDeleteModal"
  >
    <p>Apakah anda yakin ingin menghapus {{ selectedKelompokTes.nama }}</p>
    <p class="text-sm text-red-600">
      Menghapus kelompok tes berarti menghapus soal, dan jawaban peserta
    </p>
    <div class="mt-3 flex items-center justify-end gap-3">
      <psi-button variant="black" @click="closeDeleteModal">Batal</psi-button>
      <psi-button
        variant="red"
        :loading="loadingDeleteKelompokTes"
        @click="handleDeleteKelompokTes"
        >Hapus</psi-button
      >
    </div>
  </psi-modal>
</template>
