<script setup>
import { computed, onMounted, ref } from 'vue'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import FormErrorMessage from './FormErrorMessage.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  radioOptions: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String
  },
  direction: {
    type: String,
    default: 'x'
  },
  label: {
    type: String
  },
  errorMessage: {
    type: Array
  }
})

const metaValue = ref('')

const selectOption = (value) => {
  metaValue.value = value
  emit('update:modelValue', value)
}
const invalid = computed(() => {
  if (props.errorMessage?.length) {
    return true
  }
  return false
})
onMounted(() => {
  metaValue.value = props.modelValue || ''
})
</script>

<template>
  <div>
    <radio-group :model-value="metaValue" @update:model-value="selectOption">
      <radio-group-label
        :class="['ml-1', invalid ? 'text-red-400' : 'text-gray-600']"
        >{{ props.label }}</radio-group-label
      >
      <div :class="['mt-2 flex', direction === 'y' && 'flex-col']">
        <radio-group-option
          v-for="(radio, i) in props.radioOptions"
          :key="i"
          v-slot="{ checked, active }"
          :value="radio.value"
          class="w-full"
        >
          <div
            :selected="checked"
            :active="active"
            :class="[
              'w-full cursor-pointer px-3 py-2 text-center outline-none transition-colors',
              checked ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600',
              active && 'ring ring-blue-300',
              i === 0 && props.direction === 'x' && 'rounded-l-md',
              i === props.radioOptions.length - 1 &&
                props.direction === 'x' &&
                'rounded-r-md',
              i === 0 && props.direction === 'y' && 'rounded-t-md',
              i === props.radioOptions.length - 1 &&
                props.direction === 'y' &&
                'rounded-b-md',
              i !== 0 && props.direction === 'x' && 'border-l border-gray-300',
              i !== 0 && props.direction === 'y' && 'border-t border-gray-300'
            ]"
            @click="selectOption(radio.value)"
          >
            {{ radio.text }}
          </div>
        </radio-group-option>
      </div>
    </radio-group>
    <div v-if="invalid" class="ml-1 mt-1 space-y-1">
      <form-error-message :label="props.label" :messages="props.errorMessage" />
    </div>
  </div>
</template>
