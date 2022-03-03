<script setup>
import AlatTesBox from '../components/AlatTesBox.vue'
import WidgetGridContainer from '../components/WidgetGridContainer.vue'
import PsiButton from '../components/PsiButton.vue'
import WidgetContainer from '../components/WidgetContainer.vue'
import FormInput from '../components/FormInput.vue'
import { useRouter } from 'vue-router'
import PsiModal from '../components/PsiModal.vue'
import { ref } from 'vue'

const router = useRouter()
const showDeleteModal = ref(false)

const openDeleteModal = () => {
  showDeleteModal.value = true
}
const redirectAddKelompokTes = () => {
  router.push({ name: 'kelompok_tes_add_admin' })
}
const redirectEditKelompokTes = (id) => {
  router.push({ name: 'kelompok_tes_edit_admin', params: { id } })
}
const redirectEditSoal = (id) => {
  router.push({ name: 'kelompok_tes_soal_admin', params: { id } })
}
</script>

<template>
  <widget-container title="Detail Alat Tes">
    <form-input label="Nama" />
    <div class="mt-3 flex items-center justify-center gap-3">
      <psi-button variant="red" @click="$router.go(-1)">Kembali</psi-button>
      <psi-button>Ubah</psi-button>
    </div>
  </widget-container>
  <widget-grid-container title="Daftar Kelompok Tes">
    <template #cta>
      <psi-button @click="redirectAddKelompokTes"
        >Tambah Kelompok Tes</psi-button
      >
    </template>
    <alat-tes-box
      v-for="i in 10"
      :key="i"
      label="Kelompok Tes"
      :title="`Kelompok Tes ${i}`"
      subtitle="100 Soal"
      variant="violet"
    >
      <div class="flex w-full items-center gap-3">
        <psi-button
          class="w-full"
          variant="amber"
          @click="redirectEditKelompokTes(i)"
          >Edit</psi-button
        >
        <psi-button class="w-full" variant="red" @click="openDeleteModal"
          >Hapus</psi-button
        >
      </div>
      <psi-button class="mt-3 w-full" @click="redirectEditSoal(i)"
        >Soal</psi-button
      >
    </alat-tes-box>
  </widget-grid-container>

  <psi-modal
    size="xl"
    title="Hapus Kelompok Tes"
    :show-modal="showDeleteModal"
    @close-modal="showDeleteModal = false"
  >
    <p>Apakah anda yakin ingin menghapus Kelompok Tes 1</p>
    <p class="text-sm text-red-600">
      Menghapus kelompok tes berarti menghapus soal, dan jawaban peserta
    </p>
    <div class="mt-3 flex items-center justify-end gap-3">
      <psi-button variant="black" @click="showDeleteModal = false"
        >Batal</psi-button
      >
      <psi-button variant="red">Hapus</psi-button>
    </div>
  </psi-modal>
</template>
