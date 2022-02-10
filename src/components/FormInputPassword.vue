<script setup>
import { computed, ref } from 'vue'
import FormErrorMessage from './FormErrorMessage.vue'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/outline'
import FormInputLabel from './FormInputLabel.vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  },
  modelValue: {
    type: String
  },
  errorMessage: {
    type: Array
  }
})

const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false)
const metaValue = ref('')
const inputType = computed(() => (showPassword.value ? 'text' : 'password'))

const mutateValue = (e) => {
  metaValue.value = e.target.value
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div>
    <label class="relative">
      <input
        :type="inputType"
        :modelValue="props.modelValue"
        :placeholder="props.placeholder"
        class="peer w-full rounded-md border-2 border-gray-200 px-3 py-2 transition focus:border-blue-500 focus:outline-none"
        @input="mutateValue"
      />
      <form-input-label :label="props.label" :active="!!metaValue" />
      <button
        class="absolute right-2 top-0 block text-gray-400 transition-colors hover:text-blue-500"
        @click.prevent="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOffIcon : EyeIcon" class="h-6 w-6" />
      </button>
    </label>
    <div v-if="errorMessage" class="ml-1 mt-1 space-y-1">
      <form-error-message :label="props.label" :messages="errorMessage" />
    </div>
  </div>
</template>
