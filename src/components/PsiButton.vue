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
  },
  size: {
    type: String,
    default: 'md'
  }
})

const variantClass = computed(() => {
  let className = ''
  switch (props.variant) {
    case 'primary':
      className =
        'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 transition-colors disabled:bg-blue-200 disabled:text-blue-600'
      break
    case 'red':
      className =
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring focus:ring-red-300 transition-colors disabled:bg-red-200 disabled:text-red-600'
      break
    case 'black':
      className =
        'bg-gray-800 text-white hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 transition-colors disabled:bg-gray-200 disabled:text-gray-800'
      break
    case 'amber':
      className =
        'bg-amber-400 text-amber-900 hover:text-white hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300 transition-colors disabled:bg-amber-200 disabled:text-amber-900'
      break
    case 'red-outline':
      className =
        'bg-red-50 border border-red-400 text-red-900 hover:bg-red-200 active:bg-red-300 focus:outline-none focus:ring focus:ring-red-300 transition-colors disabled:bg-gray-200 disabled:text-gray-600'
      break
    default:
      className = ''
      break
  }
  return className
})

const sizeClass = computed(() => {
  let className = ''
  switch (props.size) {
    case 'sm':
      className = 'px-2 py-1 text-sm'
      break
    case 'md':
      className = 'px-4 py-2'
      break
    default:
      className = 'fill-gray-200 text-white'
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
      className = 'fill-gray-200 text-white'
      break
  }
  return className
})
</script>

<template>
  <button
    :disabled="props.loading"
    :class="['rounded-md tracking-wide', variantClass, sizeClass]"
  >
    <loading-spinner
      v-if="props.loading"
      :class="['mr-2 inline h-4 w-4 animate-spin', spinnerClass]"
    />
    <slot></slot>
  </button>
</template>
