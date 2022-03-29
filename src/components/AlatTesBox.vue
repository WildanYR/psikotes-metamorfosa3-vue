<script setup>
import DocumentIllustration from './DocumentIllustration.vue'
const props = defineProps({
  variant: {
    type: String,
    default: 'blue'
  },
  label: {
    type: String,
    default: 'Alat Tes'
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  }
})
</script>

<template>
  <div
    :class="[
      'relative flex w-max flex-col items-center justify-center rounded-xl p-6',
      props.variant === 'amber' && 'bg-amber-50',
      props.variant === 'green' && 'bg-green-50',
      props.variant === 'violet' && 'bg-violet-50',
      props.variant === 'blue' && 'bg-blue-50',
      props.variant === 'gray' && 'bg-gray-100',
      props.variant === 'rose' && 'bg-rose-50'
    ]"
  >
    <document-illustration
      :class="[
        'h-52 w-52',
        props.variant === 'amber' && 'fill-amber-500 text-amber-200',
        props.variant === 'green' && 'fill-green-500 text-green-200',
        props.variant === 'blue' && 'fill-blue-500 text-blue-200',
        props.variant === 'gray' && 'fill-gray-400 text-gray-500',
        props.variant === 'violet' && 'fill-violet-500 text-violet-200',
        props.variant === 'rose' && 'fill-rose-500 text-rose-200'
      ]"
    />
    <p class="text-xl font-bold text-gray-800">{{ props.title }}</p>
    <p v-show="props.subtitle" class="mb-5 text-sm text-gray-400">
      {{ props.subtitle }}
    </p>
    <slot></slot>
    <div
      :class="[
        'absolute top-0 right-0 rounded-tr-xl rounded-bl-xl py-2 px-6 text-white',
        props.variant === 'amber' && 'bg-amber-500',
        props.variant === 'green' && 'bg-green-500',
        props.variant === 'blue' && 'bg-blue-500',
        props.variant === 'gray' && 'bg-gray-500',
        props.variant === 'violet' && 'bg-violet-500',
        props.variant === 'rose' && 'bg-rose-500'
      ]"
    >
      {{ props.label }}
    </div>
  </div>
</template>
