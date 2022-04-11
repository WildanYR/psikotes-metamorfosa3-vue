<script setup>
import { computed, ref } from 'vue'
import FormErrorMessage from './FormErrorMessage.vue'
import FormInputLabel from './FormInputLabel.vue'
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/outline'

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
    type: String,
    default: ''
  },
  errorMessage: {
    type: Array
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false)
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})

const mutateValue = (e) => {
  emit('update:modelValue', e.target.value)
}

const invalid = computed(() => {
  if (props.errorMessage?.length) {
    return true
  }
  return false
})
</script>

<template>
  <div>
    <label class="relative">
      <input
        :type="inputType"
        :value="props.modelValue"
        :class="[
          'peer w-full rounded-md border-2 px-3 py-2 transition-colors focus:border-blue-500 focus:outline-none',
          invalid ? 'border-red-300' : 'border-gray-200'
        ]"
        :required="props.required"
        @input="mutateValue"
      />
      <form-input-label :label="props.label" :active="!!props.modelValue" />
      <button
        v-if="props.type === 'password'"
        class="absolute right-2 top-0 block text-gray-400 transition-colors hover:text-blue-500"
        @click.prevent="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOffIcon : EyeIcon" class="h-6 w-6" />
      </button>
    </label>
    <div v-if="invalid" class="ml-1 mt-1 space-y-1">
      <form-error-message :label="props.label" :messages="props.errorMessage" />
    </div>
  </div>
</template>
