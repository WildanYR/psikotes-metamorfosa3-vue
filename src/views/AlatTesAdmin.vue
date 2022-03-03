<script setup>
import AlatTesBox from '../components/AlatTesBox.vue'
import WidgetGridContainer from '../components/WidgetGridContainer.vue'
import PsiButton from '../components/PsiButton.vue'
import { useRouter } from 'vue-router'
import PsiModal from '../components/PsiModal.vue'
import { ref } from 'vue'
import FormInput from '../components/FormInput.vue'

const router = useRouter()

const showAddModal = ref(false)
const showDeleteModal = ref(false)

const redirectEdit = (id) => {
  router.push({ name: 'alat_tes_edit_admin', params: { id } })
}
const openDeleteModal = () => {
  showDeleteModal.value = true
}
</script>

<template>
  <widget-grid-container
    title="Daftar Alat Tes"
    description="dibawah ini adalah daftar semua alat tes"
  >
    <template #cta>
      <psi-button @click="showAddModal = true">Tambah Alat Tes</psi-button>
    </template>
    <alat-tes-box
      v-for="i in 10"
      :key="i"
      :title="`Alat Tes ${i}`"
      subtitle="10 Kelompok Tes"
      variant="blue"
    >
      <div class="flex w-full items-center gap-3">
        <psi-button class="w-full" variant="amber" @click="redirectEdit(i)"
          >Edit</psi-button
        >
        <psi-button class="w-full" variant="red" @click="openDeleteModal"
          >Hapus</psi-button
        >
      </div>
    </alat-tes-box>
  </widget-grid-container>

  <psi-modal
    size="2xl"
    title="Tambah Alat Tes"
    :show-modal="showAddModal"
    @close-modal="showAddModal = false"
  >
    <form-input label="Nama" />
    <div class="mt-3 flex items-center justify-end gap-3">
      <psi-button variant="black" @click="showAddModal = false"
        >Batal</psi-button
      >
      <psi-button>Tambah</psi-button>
    </div>
  </psi-modal>
  <psi-modal
    size="xl"
    title="Hapus Alat Tes"
    :show-modal="showDeleteModal"
    @close-modal="showDeleteModal = false"
  >
    <p>Apakah anda yakin ingin menghapus Alat Tes 1</p>
    <p class="text-sm text-red-600">
      Menghapus alat tes berarti menghapus kelompok tes, soal, dan jawaban
      peserta
    </p>
    <div class="mt-3 flex items-center justify-end gap-3">
      <psi-button variant="black" @click="showDeleteModal = false"
        >Batal</psi-button
      >
      <psi-button variant="red">Hapus</psi-button>
    </div>
  </psi-modal>
</template>
