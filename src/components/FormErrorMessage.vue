<script setup>
import { XCircleIcon } from '@heroicons/vue/solid'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  messages: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <p v-for="(error, i) in props.messages" :key="i" class="text-sm text-red-500">
    <XCircleIcon class="inline h-4 w-4" />
    {{ `${props.label} ${error}` }}
  </p>
</template>
