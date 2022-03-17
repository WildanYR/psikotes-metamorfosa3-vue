<script setup>
import FormInput from './FormInput.vue'
import PsiEditor from './PsiEditor.vue'

const props = defineProps({
  nama: {
    type: String,
    default: ''
  },
  waktu: {
    type: String,
    default: ''
  },
  petunjuk: {
    type: String,
    default: ''
  },
  errorNama: {
    type: Array
  },
  errorWaktu: {
    type: Array
  },
  errorPetunjuk: {
    type: Array
  }
})
const emit = defineEmits(['update:nama', 'update:waktu', 'update:petunjuk'])
</script>

<template>
  <div class="space-y-6">
    <form-input
      label="Nama"
      :model-value="props.nama"
      :error-message="props.errorNama"
      @update:model-value="(e) => emit('update:nama', e)"
    />
    <form-input
      label="Waktu"
      type="number"
      :model-value="props.waktu"
      :error-message="props.errorWaktu"
      @update:model-value="(e) => emit('update:waktu', e)"
    />
    <psi-editor
      label="Petunjuk"
      :model-value="props.petunjuk"
      :error-message="props.errorPetunjuk"
      @update:model-value="(e) => emit('update:petunjuk', e)"
    />
  </div>
</template>
