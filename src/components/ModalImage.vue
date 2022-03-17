<script setup>
import PsiModal from './PsiModal.vue'
import PsiButton from './PsiButton.vue'
import { reactive, ref, watch } from 'vue'
import FormInput from './FormInput.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import config from '../config'
import {
  getAllImage,
  addNewFolder,
  uploadImage,
  removeImage,
  removeFolder
} from '../services/imageManagerService'
import FormValidator from '../helpers/formValidation'
import { notify } from '@kyvg/vue3-notification'
import FileBox from './FileBox.vue'
import EmptyData from './EmptyData.vue'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closeModal', 'imageSelected'])
const dataImages = ref([])
const inputFile = ref(null)
const loadingImage = ref(false)
const loadingUploadImage = ref(false)
const loadingDeleteImage = ref(false)
const loadingFolder = ref(false)
const showFolderModal = ref(false)
const formFolder = reactive({ nama: '' })
const formFolderValidation = reactive({
  nama: { invalid: false, errorMessage: [] }
})
const path = ref('')

const handleCloseModal = () => {
  if (!loadingImage.value || !loadingFolder.value) {
    path.value = ''
    emit('closeModal')
  }
}
const openFolderModal = () => {
  showFolderModal.value = true
}
const closeFolderModal = () => {
  if (!loadingFolder.value) {
    showFolderModal.value = false
  }
}
const generateImageUrl = (name) => {
  return `${config.cdnUrl}${path.value}${path.value ? '/' : ''}${name}`
}
const handleGetAllImage = () => {
  loadingImage.value = true
  getAllImage(path.value)
    .then((data) => {
      dataImages.value = [
        ...data.directories.map((dir) => ({ name: dir, type: 'folder' })),
        ...data.files.map((file) => ({ name: file, type: 'file' }))
      ]
    })
    .finally(() => {
      loadingImage.value = false
    })
}
const handleAddFolder = () => {
  formFolderValidation.nama = new FormValidator(formFolder.nama).isRequired()
  if (formFolderValidation.nama.invalid) {
    return
  }
  loadingFolder.value = true
  addNewFolder(`${path.value}/${formFolder.nama}`)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetAllImage()
    })
    .finally(() => {
      loadingFolder.value = false
      closeFolderModal()
    })
}
const handleSelectImage = (data) => {
  if (
    loadingImage.value ||
    loadingUploadImage.value ||
    loadingDeleteImage.value
  ) {
    return
  }
  if (data.type !== 'file') {
    if (!path.value) {
      path.value = data.name
    } else {
      path.value += `/${data.name}`
    }
    handleGetAllImage()
  } else {
    emit('imageSelected', `${path.value}${path.value ? '/' : ''}${data.name}`)
  }
}
const handleDeleteImage = (data) => {
  if (loadingDeleteImage.value) {
    return
  }
  loadingDeleteImage.value = true
  const filePath = `${path.value}${path.value ? '/' : ''}${data.name}`
  let action = null
  if (data.type !== 'file') {
    action = removeFolder
  } else {
    action = removeImage
  }
  action(filePath)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetAllImage()
    })
    .finally(() => {
      loadingDeleteImage.value = false
    })
}
const handleBackDir = () => {
  const pathArray = path.value.split('/').slice(0, -1)
  if (!pathArray.length) {
    path.value = ''
  } else {
    path.value = pathArray.join('/')
  }
  handleGetAllImage()
}
const openInputFile = () => {
  inputFile.value.click()
}
const handleUploadImage = (event) => {
  if (loadingUploadImage.value) {
    return
  }
  if (!event.target.files[0]) {
    return
  }
  loadingUploadImage.value = true
  const formData = new FormData()
  formData.append('path', path.value || '/')
  formData.append('image', event.target.files[0])
  uploadImage(formData)
    .then((data) => {
      notify({
        title: 'Berhasil',
        text: data.message,
        type: 'success'
      })
      handleGetAllImage()
    })
    .finally(() => {
      inputFile.value.value = ''
      loadingUploadImage.value = false
    })
}

watch(
  () => props.showModal,
  (value) => {
    if (value) {
      handleGetAllImage()
    }
  }
)
</script>

<template>
  <psi-modal
    :show-modal="props.showModal"
    title="Pilih Gambar"
    size="full"
    @close-modal="handleCloseModal"
  >
    <div class="mb-5 flex items-center gap-5">
      <input
        ref="inputFile"
        type="file"
        accept="image/*"
        class="sr-only"
        @change="handleUploadImage"
      />
      <psi-button :loading="loadingUploadImage" @click="openInputFile"
        >Upload Gambar</psi-button
      >
      <psi-button variant="black" @click="openFolderModal"
        >Folder baru</psi-button
      >
    </div>
    <div v-if="loadingImage" class="flex items-center justify-center">
      <loading-spinner
        class="h-14 w-14 animate-spin fill-blue-100 text-blue-600"
      />
    </div>
    <div v-else class="grid grid-cols-6 gap-5">
      <file-box
        v-show="!!path"
        label="kembali"
        type="folder"
        :hide-delete="true"
        @on-selected="handleBackDir"
      />
      <template v-if="dataImages?.length">
        <file-box
          v-for="file in dataImages"
          :key="file.name"
          :label="file.name"
          :type="file.type"
          :img="file.type === 'file' ? generateImageUrl(file.name) : ''"
          :loading-delete="loadingDeleteImage"
          @on-selected="handleSelectImage"
          @on-delete="handleDeleteImage"
        />
      </template>
      <empty-data v-else :class="[!!path ? 'col-span-5' : 'col-span-full']" />
    </div>
    <psi-modal
      size="2xl"
      title="Tambah Folder"
      :show-modal="showFolderModal"
      @close-modal="closeFolderModal"
    >
      <form-input
        v-model="formFolder.nama"
        label="Nama Folder"
        :error-message="formFolderValidation.nama.errorMessage"
      />
      <div class="mt-3 flex items-center justify-end gap-3">
        <psi-button variant="black" @click="closeFolderModal">Batal</psi-button>
        <psi-button :loading="loadingFolder" @click="handleAddFolder"
          >Tambah</psi-button
        >
      </div>
    </psi-modal>
  </psi-modal>
</template>
