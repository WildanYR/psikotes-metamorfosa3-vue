<script setup>
import { computed } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'primary'
  }
})

const variantClass = computed(() => {
  let className = ''
  switch (props.variant) {
    case 'primary':
      className =
        'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 transition-colors disabled:bg-blue-200 disabled:text-blue-600'
      break
    default:
      className = ''
      break
  }
  return className
})

const spinnerClass = computed(() => {
  let className = ''
  switch (props.variant) {
    case 'primary':
      className = 'text-blue-800 fill-blue-400'
      break
    default:
      className = ''
      break
  }
  return className
})
</script>

<template>
  <button
    :disabled="props.loading"
    :class="['rounded-md px-4 py-2 tracking-wide', variantClass]"
  >
    <loading-spinner
      v-if="props.loading"
      :class="['mr-2 inline h-4 w-4 animate-spin', spinnerClass]"
    />
    <slot></slot>
  </button>
</template>
