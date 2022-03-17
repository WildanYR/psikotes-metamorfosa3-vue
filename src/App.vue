<script setup>
import { useLoadingStore } from './stores/loading'
import {
  XIcon,
  EmojiHappyIcon,
  EmojiSadIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/vue/outline'
import FullscreenLoading from './components/FullscreenLoading.vue'

const loadingStore = useLoadingStore()
</script>
<template>
  <fullscreen-loading v-if="loadingStore.global" />
  <router-view v-else class="scroll-smooth text-gray-800"></router-view>
  <notifications position="top center">
    <template #body="props">
      <div
        :class="[
          'mt-4 flex items-start justify-between rounded-lg border p-4',
          props.item.type === 'success'
            ? 'border-green-200 bg-green-50'
            : props.item.type === 'error'
            ? 'border-red-200 bg-red-50'
            : props.item.type === 'warning'
            ? 'border-amber-200 bg-amber-50'
            : 'border-blue-200 bg-blue-50'
        ]"
      >
        <div class="flex items-center justify-center gap-3">
          <EmojiHappyIcon
            v-if="props.item.type === 'success'"
            class="h-7 w-7 text-green-700"
          />
          <EmojiSadIcon
            v-else-if="props.item.type === 'error'"
            class="h-7 w-7 text-red-700"
          />
          <ExclamationCircleIcon
            v-else-if="props.item.type === 'warning'"
            class="h-7 w-7 text-amber-700"
          />
          <InformationCircleIcon v-else class="h-7 w-7 text-blue-700" />
          <div>
            <p
              :class="[
                'font-bold',
                props.item.type === 'success'
                  ? 'text-green-900'
                  : props.item.type === 'error'
                  ? 'text-red-900'
                  : props.item.type === 'warning'
                  ? 'text-amber-900'
                  : 'text-blue-900'
              ]"
            >
              {{ props.item.title }}
            </p>
            <p class="text-sm">{{ props.item.text }}</p>
          </div>
        </div>
        <button class="text-gray-600 hover:text-gray-800" @click="props.close">
          <XIcon class="h-4 w-4" />
        </button>
      </div>
    </template>
  </notifications>
</template>
