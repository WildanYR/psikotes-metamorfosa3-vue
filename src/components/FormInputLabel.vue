<script setup>
const props = defineProps({
  label: {
    required: true,
    type: String
  },
  active: {
    type: Boolean
  }
})
</script>

<template>
  <span
    :class="[
      'absolute top-0 left-3 text-gray-600 transition peer-focus:-translate-x-1 peer-focus:-translate-y-5 peer-focus:transform peer-focus:bg-white peer-focus:px-1 peer-focus:text-sm peer-focus:text-blue-500',
      props.active &&
        '-translate-x-1 -translate-y-5 transform bg-white px-1 text-sm text-blue-500'
    ]"
  >
    {{ props.label }}
  </span>
</template>
