<script setup>
import LoadingSpinner from './LoadingSpinner.vue'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="rounded-xl bg-white p-6 shadow-lg">
    <div class="mb-10 flex items-center justify-between">
      <div>
        <h2 class="text-3xl font-bold text-gray-800">{{ props.title }}</h2>
        <p v-if="props.description" class="text-sm text-gray-600">
          {{ props.description }}
        </p>
      </div>
      <slot name="cta"></slot>
    </div>
    <div v-if="props.loading" class="flex items-center justify-center">
      <loading-spinner
        class="h-16 w-16 animate-spin fill-blue-100 text-blue-600"
      />
    </div>
    <slot v-else></slot>
  </div>
</template>
