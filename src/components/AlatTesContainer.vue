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
    <div class="mb-10">
      <h2 class="text-3xl font-bold text-gray-800">{{ props.title }}</h2>
      <p v-if="props.description" class="text-sm text-gray-600">
        {{ props.description }}
      </p>
    </div>
    <div
      class="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 xl:grid-cols-4"
    >
      <slot></slot>
    </div>
  </div>
</template>
