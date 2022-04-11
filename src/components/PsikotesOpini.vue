<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])

const metaValue = ref('')

const updateValue = (value) => {
  metaValue.value = value
  emit('update:modelValue', metaValue.value)
}

onMounted(() => {
  if (props.modelValue) {
    metaValue.value = props.modelValue
  }
})
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <button
      :class="[
        'w-full rounded-lg p-3',
        metaValue === 'Setuju'
          ? 'bg-blue-500 font-bold text-white'
          : 'bg-gray-200'
      ]"
      @click="updateValue('Setuju')"
    >
      Setuju
    </button>
    <button
      :class="[
        'w-full rounded-lg p-3',
        metaValue === 'Tidak setuju'
          ? 'bg-blue-500 font-bold text-white'
          : 'bg-gray-200'
      ]"
      @click="updateValue('Tidak setuju')"
    >
      Tidak setuju
    </button>
    <button
      :class="[
        'w-full rounded-lg p-3',
        metaValue === 'Ragu-ragu'
          ? 'bg-blue-500 font-bold text-white'
          : 'bg-gray-200'
      ]"
      @click="updateValue('Ragu-ragu')"
    >
      Ragu-ragu
    </button>
  </div>
</template>
