<script setup>
import { RadioGroup, RadioGroupOption, RadioGroupLabel } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/solid'
import config from '../config'

const props = defineProps({
  opsi: {
    type: Array,
    required: true
  },
  direction: {
    type: String,
    default: 'y'
  },
  modelValue: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <RadioGroup
      :model-value="props.modelValue"
      @update:model-value="(e) => emit('update:modelValue', e)"
    >
      <RadioGroupLabel class="sr-only">Opsi Pilgan</RadioGroupLabel>
      <div
        :class="[
          'grid gap-3',
          props.direction === 'y' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-5'
        ]"
      >
        <RadioGroupOption
          v-for="(ops, i) in props.opsi"
          :key="i"
          v-slot="{ active, checked }"
          as="template"
          :value="ops.value"
        >
          <div
            :class="[
              active
                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                : '',
              checked
                ? 'border-2 border-blue-500 bg-blue-50 font-bold text-blue-900'
                : 'border border-gray-500 bg-white'
            ]"
            class="relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none"
          >
            <div
              :class="[
                'flex w-full items-center gap-3',
                props.direction === 'y'
                  ? 'flex-row justify-between'
                  : 'flex-col justify-center'
              ]"
            >
              <div class="flex items-center">
                <div class="text-sm">
                  <RadioGroupLabel as="template">
                    <p v-if="ops.type === 'text'">{{ ops.teks }}</p>
                    <img
                      v-else
                      loading="lazy"
                      :src="config.cdnUrl + ops.teks"
                      class="w-44"
                    />
                  </RadioGroupLabel>
                </div>
              </div>
              <div v-show="checked" class="text-blue-700">
                <check-circle-icon class="h-7 w-7" />
              </div>
            </div>
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>
