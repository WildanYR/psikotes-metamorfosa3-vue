<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
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
    <slot></slot>
  </div>
</template>
