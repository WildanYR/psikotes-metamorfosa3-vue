<script setup>
import { CubeIcon } from '@heroicons/vue/outline'
import PsiButton from './PsiButton.vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  },
  loadingSelect: {
    type: Boolean,
    default: false
  },
  loadingDelete: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['onSelected', 'onDelete'])
</script>

<template>
  <div
    class="relative flex w-max flex-col items-center justify-center rounded-xl p-6"
    :class="[props.active ? 'bg-blue-50' : 'bg-gray-50']"
  >
    <cube-icon
      class="h-36 w-36"
      :class="[props.active ? 'text-blue-500' : 'text-gray-500']"
    />
    <p class="mb-5 text-xl font-bold">{{ props.label }}</p>
    <psi-button
      class="w-full"
      :variant="props.active ? 'primary' : 'black'"
      :loading="props.loadingSelect"
      :disabled="props.loadingDelete || props.active"
      @click="emit('onSelected')"
      >Pilih</psi-button
    >
    <psi-button
      class="mt-2 w-full"
      variant="red"
      :loading="props.loadingDelete"
      :disabled="props.active || props.loadingSelect"
      @click="emit('onDelete')"
      >Hapus</psi-button
    >
    <div
      class="absolute top-0 right-0 rounded-tr-xl rounded-bl-xl py-2 px-6 text-white"
      :class="[props.active ? 'bg-blue-600' : 'bg-gray-600']"
    >
      Sesi
    </div>
  </div>
</template>
