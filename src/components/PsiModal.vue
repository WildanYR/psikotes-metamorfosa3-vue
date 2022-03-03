<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogTitle,
  DialogOverlay
} from '@headlessui/vue'
const emit = defineEmits(['closeModal'])
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  },
  title: {
    type: String,
    required: true
  },
  hideTitle: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <TransitionRoot appear :show="props.showModal" as="template">
    <Dialog as="div" @close="emit('closeModal')">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black bg-opacity-40" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              :class="[
                'my-8 inline-block w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                props.size === 'sm' && 'max-w-sm',
                props.size === 'md' && 'max-w-md',
                props.size === 'lg' && 'max-w-lg',
                props.size === 'xl' && 'max-w-xl',
                props.size === '2xl' && 'max-w-2xl',
                props.size === '3xl' && 'max-w-3xl',
                props.size === '4xl' && 'max-w-4xl',
                props.size === 'full' && 'max-w-full'
              ]"
            >
              <DialogTitle
                as="h3"
                :class="[
                  'text-xl font-bold leading-6 text-gray-900',
                  props.hideTitle && 'sr-only'
                ]"
              >
                {{ props.title }}
              </DialogTitle>
              <div :class="[!props.hideTitle && 'mt-2']">
                <slot></slot>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
