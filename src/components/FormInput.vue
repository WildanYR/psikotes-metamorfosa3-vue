<script setup>
import { onMounted, ref } from 'vue'
import FormErrorMessage from './FormErrorMessage.vue'
import FormInputLabel from './FormInputLabel.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String
  },
  errorMessage: {
    type: Array
  }
})

const emit = defineEmits(['update:modelValue'])
const metaValue = ref('')

const mutateValue = (e) => {
  metaValue.value = e.target.value
  emit('update:modelValue', e.target.value)
}

onMounted(() => {
  metaValue.value = props.modelValue || ''
})
</script>

<template>
  <div>
    <label class="relative">
      <input
        :type="props.type"
        :modelValue="props.modelValue"
        class="peer w-full rounded-md border-2 border-gray-200 px-3 py-2 transition-colors focus:border-blue-500 focus:outline-none"
        required
        @input="mutateValue"
      />
      <form-input-label :label="props.label" :active="!!metaValue" />
    </label>
    <div v-if="errorMessage" class="ml-1 mt-1 space-y-1">
      <form-error-message :label="props.label" :messages="errorMessage" />
    </div>
  </div>
</template>
