<script setup>
import WidgetContainer from '../components/WidgetContainer.vue'
import KelompokTesForm from '../components/KelompokTesForm.vue'
import PsiButton from '../components/PsiButton.vue'
</script>

<template>
  <widget-container
    :title="`${$route.meta.mode === 'add' ? 'Tambah' : 'Ubah'} kelompok tes`"
  >
    <kelompok-tes-form />
    <div class="mt-6 flex items-center justify-center gap-3">
      <psi-button variant="black" @click="$router.go(-1)">Kembali</psi-button>
      <psi-button>{{
        $route.meta.mode === 'add' ? 'Tambah' : 'Ubah'
      }}</psi-button>
    </div>
  </widget-container>
</template>
