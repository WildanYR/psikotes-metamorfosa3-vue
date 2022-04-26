<script setup>
import { ref, onMounted } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/solid'
import config from '../config'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  opsi: {
    type: Array,
    required: true
  },
  direction: {
    type: String,
    default: 'y'
  }
})
const emit = defineEmits(['update:modelValue'])

const metaValue = ref([])

const updateSelected = (value) => {
  if (metaValue.value.includes(value)) {
    metaValue.value = metaValue.value
      .filter((item) => item !== value)
      .sort((a, b) => a - b)
  } else {
    metaValue.value.push(value)
    metaValue.value = metaValue.value.sort((a, b) => a - b)
  }
  emit('update:modelValue', metaValue.value)
}

onMounted(() => {
  if (props.modelValue && props.modelValue.length > 0) {
    metaValue.value = [...props.modelValue]
  }
})
</script>

<template>
  <div class="mb-4 text-center text-sm text-gray-500">
    Jawaban bisa lebih dari satu
  </div>
  <div
    :class="[
      'grid gap-3',
      props.direction === 'y' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-5'
    ]"
  >
    <button
      v-for="(ops, i) in props.opsi"
      :key="i"
      :class="[
        metaValue.includes(ops.value)
          ? 'border-2 border-blue-500 bg-blue-50 font-bold text-blue-900'
          : 'border border-gray-500 bg-white'
      ]"
      class="relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none"
      @click="updateSelected(ops.value)"
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
            <p v-if="ops.type === 'text'">{{ ops.teks }}</p>
            <img
              v-else
              loading="lazy"
              :src="config.cdnUrl + ops.teks"
              class="w-44"
            />
          </div>
        </div>
        <div v-show="metaValue.includes(ops.value)" class="text-blue-700">
          <check-circle-icon class="h-7 w-7" />
        </div>
      </div>
    </button>
  </div>
</template>
