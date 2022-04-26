<script setup>
import { ChevronDoubleLeftIcon } from '@heroicons/vue/outline'
const emit = defineEmits(['close'])
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  navs: {
    type: Array
  }
})
const appVersion = __APP_VERSION
</script>

<template>
  <Transition
    enter-active-class="transition-opacity"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="props.isOpen"
      aria-hidden="true"
      class="fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden"
      @click="emit('close')"
    ></div>
  </Transition>
  <aside
    :class="[
      'fixed inset-y-0 z-10 h-screen flex-shrink-0 transform transition-transform',
      props.isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <div class="flex h-full w-64 flex-col border-r border-gray-300 bg-white">
      <div class="flex-shrink-0 px-4 py-2">
        <img
          loading="lazy"
          src="../assets/logo.png"
          alt="logo ppt metamorfosa"
          class="pointer-events-none mx-auto w-1/2"
        />
      </div>

      <nav
        aria-label="Main"
        class="mt-5 flex flex-1 flex-col gap-y-2 overflow-y-hidden p-2 hover:overflow-y-auto"
      >
        <router-link
          v-for="(nav, i) in props.navs"
          :key="i"
          :to="{ name: nav.name }"
          :class="[
            'flex items-center gap-3 rounded-lg  p-3 text-sm font-medium ',
            nav.active && 'bg-blue-50 text-blue-900'
          ]"
        >
          <component :is="nav.icon" class="h-5 w-5" />
          <p>{{ nav.label }}</p>
        </router-link>
      </nav>

      <div class="flex-shrink-0 p-4 md:hidden">
        <button
          class="w-full rounded-lg bg-blue-100 py-2 text-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-600 active:text-white"
          @click="emit('close')"
        >
          <ChevronDoubleLeftIcon class="mx-auto h-5 w-5" />
        </button>
      </div>
      <p class="my-2 text-center text-sm text-gray-500">v{{ appVersion }}</p>
    </div>
  </aside>
</template>
