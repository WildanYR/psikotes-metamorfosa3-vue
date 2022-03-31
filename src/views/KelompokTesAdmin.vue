<script setup>
import WidgetContainer from '../components/WidgetContainer.vue'
import KelompokTesForm from '../components/KelompokTesForm.vue'
import PsiButton from '../components/PsiButton.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'
import {
  detailKelompokTes,
  addKelompokTes,
  updateKelompokTes
} from '../services/kelompokTesService'
import FormValidator from '../helpers/formValidation'

const route = useRoute()
const loadingGet = ref(false)
const loadingUpsert = ref(false)
const formKelompokTes = reactive({
  nama: '',
  waktu: '0',
  petunjuk: '',
  sort_index: '0'
})
const formKelompokTesValidation = reactive({
  nama: { invalid: false, errorMessage: [] },
  waktu: { invalid: false, errorMessage: [] },
  petunjuk: { invalid: false, errorMessage: [] }
})

const mode = computed(() => route.meta.mode)

const validForm = () => {
  formKelompokTesValidation.nama = new FormValidator(
    formKelompokTes.nama
  ).isRequired()
  if (formKelompokTesValidation.nama.invalid) {
    return false
  }
  return true
}
const handleGetDetail = () => {
  loadingGet.value = true
  detailKelompokTes(route.params.id)
    .then((data) => {
      formKelompokTes.nama = data.nama
      formKelompokTes.waktu = data.waktu.toString()
      formKelompokTes.sort_index = data.sort_index.toString()
      formKelompokTes.petunjuk = data.petunjuk
    })
    .finally(() => {
      loadingGet.value = false
    })
}
const handleAdd = () => {
  if (!validForm()) {
    return
  }
  loadingUpsert.value = true
  addKelompokTes(
    route.params.alatTesId,
    formKelompokTes.nama,
    formKelompokTes.waktu,
    formKelompokTes.petunjuk,
    formKelompokTes.sort_index
  )
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetDetail()
    })
    .finally(() => {
      loadingUpsert.value = false
    })
}
const handleUpdate = () => {
  if (!validForm()) {
    return
  }
  loadingUpsert.value = true
  updateKelompokTes(
    route.params.id,
    formKelompokTes.nama,
    formKelompokTes.waktu,
    formKelompokTes.petunjuk,
    formKelompokTes.sort_index
  )
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetDetail()
    })
    .finally(() => {
      loadingUpsert.value = false
    })
}
const handleUpsert = () => {
  if (mode.value === 'add') {
    handleAdd()
  } else {
    handleUpdate()
  }
}

onMounted(() => {
  if (mode.value === 'edit') {
    handleGetDetail()
  }
})
</script>

<template>
  <widget-container
    :title="`${mode === 'add' ? 'Tambah' : 'Ubah'} kelompok tes`"
    :loading="loadingGet"
  >
    <kelompok-tes-form
      v-model:nama="formKelompokTes.nama"
      v-model:waktu="formKelompokTes.waktu"
      v-model:petunjuk="formKelompokTes.petunjuk"
      v-model:sort-index="formKelompokTes.sort_index"
      :error-nama="formKelompokTesValidation.nama.errorMessage"
      :error-waktu="formKelompokTesValidation.waktu.errorMessage"
      :error-petunjuk="formKelompokTesValidation.petunjuk.errorMessage"
    />
    <div class="mt-6 flex items-center justify-center gap-3">
      <psi-button variant="black" @click="$router.go(-1)">Kembali</psi-button>
      <psi-button :loading="loadingUpsert" @click="handleUpsert">{{
        mode === 'add' ? 'Tambah' : 'Ubah'
      }}</psi-button>
    </div>
  </widget-container>
</template>
