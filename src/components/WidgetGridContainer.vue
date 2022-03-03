<script setup>
import { ZoomOutIcon } from '@heroicons/vue/outline'
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
    <div
      class="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2 xl:grid-cols-4"
    >
      <slot>
        <div
          class="col-span-full flex flex-col items-center justify-center gap-5"
        >
          <zoom-out-icon class="h-24 w-24 text-gray-300" />
          <h3 class="text-2xl text-gray-600">Tidak Ada Data</h3>
        </div>
      </slot>
    </div>
  </div>
</template>
