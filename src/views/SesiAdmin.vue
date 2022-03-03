<script setup>
import WidgetGridContainer from '../components/WidgetGridContainer.vue'
import PsiButton from '../components/PsiButton.vue'
import SesiBox from '../components/SesiBox.vue'
import AlatTesBox from '../components/AlatTesBox.vue'
import PsiModal from '../components/PsiModal.vue'
import { ref } from 'vue'
import FormInput from '../components/FormInput.vue'

const showAddModal = ref(false)
</script>

<template>
  <widget-grid-container id="sesi-aktif" title="Daftar Sesi">
    <template #cta>
      <div class="flex items-center gap-2">
        <a
          href="#alat-tes-aktif"
          class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800 disabled:bg-blue-200 disabled:text-blue-600"
          >Setting Alat Tes Aktif</a
        >
        <psi-button @click="showAddModal = true">Tambah Sesi</psi-button>
        <psi-button variant="black">Reset Sesi</psi-button>
      </div>
    </template>
    <sesi-box></sesi-box>
    <sesi-box></sesi-box>
    <sesi-box :active="true"></sesi-box>
    <sesi-box></sesi-box>
    <sesi-box></sesi-box>
  </widget-grid-container>
  <widget-grid-container id="alat-tes-aktif" title="Alat Tes Aktif">
    <template #cta>
      <a
        href="#sesi-aktif"
        class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-800 disabled:bg-blue-200 disabled:text-blue-600"
        >Setting Sesi Aktif</a
      >
    </template>
    <alat-tes-box variant="gray" title="Alat Tes 1" subtitle="Tidak Aktif">
      <psi-button variant="black" class="w-full">Pilih</psi-button>
    </alat-tes-box>
    <alat-tes-box variant="blue" title="Alat Tes 1" subtitle="Aktif">
      <psi-button class="w-full">Pilih</psi-button>
    </alat-tes-box>
  </widget-grid-container>

  <psi-modal
    size="2xl"
    title="Tambah Sesi"
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
</template>
