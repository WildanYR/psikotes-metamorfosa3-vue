<script setup>
import { FolderIcon, TrashIcon } from '@heroicons/vue/solid'
import PsiButton from './PsiButton.vue'

const props = defineProps({
  type: {
    type: String
  },
  img: {
    type: String
  },
  label: {
    type: String,
    required: true
  },
  hideDelete: {
    type: Boolean,
    default: false
  },
  loadingDelete: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['onSelected', 'onDelete'])

const handleSelected = () => {
  emit('onSelected', { type: props.type, name: props.label })
}
const handleDelete = () => {
  emit('onDelete', { type: props.type, name: props.label })
}
</script>

<template>
  <div
    :class="[
      'relative flex w-max flex-col items-center justify-center rounded-xl px-5 pb-3 pt-7',
      props.type === 'file' ? 'bg-blue-50' : 'bg-gray-50'
    ]"
  >
    <img
      v-if="props.type === 'file'"
      loading="lazy"
      :src="props.img"
      class="w-36"
    />
    <folder-icon v-else class="h-28 w-28 text-gray-400" />
    <p v-show="props.type === 'file'" class="mb-5 mt-2">{{ props.label }}</p>
    <psi-button class="w-full" variant="black" @click="handleSelected()">{{
      props.type === 'file' ? 'Pilih' : props.label
    }}</psi-button>
    <psi-button
      v-if="!props.hideDelete"
      variant="red"
      class="mt-2 w-full"
      size="sm"
      :loading="props.loadingDelete"
      @click="handleDelete()"
    >
      Hapus
    </psi-button>
    <div
      :class="[
        'absolute top-0 right-0 rounded-tr-xl rounded-bl-xl py-1 px-5 text-sm text-white',
        props.type === 'file' ? 'bg-blue-600' : 'bg-gray-500'
      ]"
    >
      {{ props.type === 'file' ? 'Gambar' : 'Folder' }}
    </div>
  </div>
</template>
