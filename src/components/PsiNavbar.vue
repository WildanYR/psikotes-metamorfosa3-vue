<script setup>
import { MenuIcon, UserIcon, LogoutIcon } from '@heroicons/vue/outline'
import { UserIcon as UserIconSolid } from '@heroicons/vue/solid'
import { ref } from 'vue'
import PsiModal from './PsiModal.vue'
import PsiButton from './PsiButton.vue'

const emit = defineEmits(['menuClick', 'onLogout'])
const props = defineProps({
  page: {
    type: String,
    default: ''
  },
  email: {
    type: String
  },
  logoutLoading: {
    type: Boolean,
    default: false
  }
})
const showModal = ref(false)
</script>

<template>
  <div
    class="flex w-full items-center justify-between rounded-xl bg-white py-2 px-3"
  >
    <div class="flex items-center gap-3">
      <button
        class="rounded-md bg-blue-50 p-2 text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-600 active:text-white"
        @click="emit('menuClick')"
      >
        <menu-icon class="h-4 w-4" />
      </button>
      <p class="hidden text-lg font-medium text-gray-600 md:block">
        {{ props.page }}
      </p>
    </div>
    <img
      loading="lazy"
      src="../assets/logo.png"
      alt="logo ppt metamorfosa"
      class="pointer-events-none h-6 md:hidden"
    />
    <button
      class="rounded-md bg-blue-50 p-2 text-blue-700 focus:outline-none focus:ring focus:ring-blue-300 active:bg-blue-600 active:text-white md:hidden"
      @click="showModal = true"
    >
      <user-icon class="h-4 w-4" />
    </button>
    <div class="hidden items-center justify-between gap-8 md:flex">
      <div class="flex items-center justify-center gap-2">
        <p class="text-sm font-medium">{{ props.email }}</p>
        <div class="rounded-full bg-pink-100 p-2 text-pink-700">
          <user-icon-solid class="h-4 w-4" />
        </div>
      </div>
      <psi-button
        variant="red-outline"
        size="sm"
        :loading="props.logoutLoading"
        @click="emit('onLogout')"
      >
        keluar
        <logout-icon class="inline h-4 w-4" />
      </psi-button>
    </div>
  </div>
  <psi-modal
    :show-modal="showModal"
    title="Opsi User"
    :hide-title="true"
    @close-modal="showModal = false"
  >
    <div class="flex flex-col items-center gap-2">
      <p class="text-sm text-gray-400">Akun</p>
      <div class="rounded-full bg-pink-100 p-4 text-pink-700">
        <user-icon-solid class="h-7 w-7" />
      </div>
      <p class="font-medium">pesertatesting@gmail.com</p>
      <psi-button variant="red-outline">
        keluar
        <logout-icon class="inline h-5 w-5" />
      </psi-button>
    </div>
  </psi-modal>
</template>
