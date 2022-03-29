<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
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
  emit('update:modelValue', metaValue.value.join(''))
}

onMounted(() => {
  if (props.modelValue) {
    metaValue.value = props.modelValue.split('')
  }
})
</script>

<template>
  <div
    class="grid auto-cols-max grid-cols-3 items-center gap-7 md:grid-cols-10"
  >
    <button
      v-for="i in 10"
      :key="i"
      :class="[
        'rounded-xl p-3',
        metaValue.includes(i - 1)
          ? 'bg-blue-500 font-bold text-white'
          : 'bg-gray-200'
      ]"
      @click="updateSelected(i - 1)"
    >
      {{ i - 1 }}
    </button>
  </div>
</template>
