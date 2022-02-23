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
        metaValue === 'v' ? 'bg-blue-500 font-bold text-white' : 'bg-gray-200'
      ]"
      @click="updateValue('v')"
    >
      Setuju
    </button>
    <button
      :class="[
        'w-full rounded-lg p-3',
        metaValue === 'x' ? 'bg-blue-500 font-bold text-white' : 'bg-gray-200'
      ]"
      @click="updateValue('x')"
    >
      Tidak setuju
    </button>
  </div>
</template>
