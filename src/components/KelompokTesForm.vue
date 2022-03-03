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
  }
})
const emit = defineEmits(['update:nama', 'update:waktu', 'update:petunjuk'])
</script>

<template>
  <div class="space-y-6">
    <form-input
      label="Nama"
      :model-value="props.nama"
      @update:model-value="(e) => emit('update:nama', e)"
    />
    <form-input
      label="Waktu"
      type="number"
      :model-value="props.waktu"
      @update:model-value="(e) => emit('update:waktu', e)"
    />
    <psi-editor
      label="Petunjuk"
      :model-value="props.waktu"
      @update:model-value="(e) => emit('update:waktu', e)"
    />
  </div>
</template>
