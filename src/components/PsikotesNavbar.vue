<script setup>
import { QuestionMarkCircleIcon, ClockIcon } from '@heroicons/vue/solid'
import { computed } from 'vue'
const props = defineProps({
  alatTes: {
    type: String
  },
  kelompokTes: {
    type: String
  },
  timer: {
    type: Boolean,
    default: false
  },
  jumlahSoal: {
    type: Number,
    required: true
  },
  soalDikerjakan: {
    type: Number,
    required: true
  }
})

const soalPercentage = computed(() => {
  if (props.jumlahSoal && props.jumlahSoal > 0) {
    const percentage = Math.floor(
      (props.soalDikerjakan / props.jumlahSoal) * 100
    )
    return `${percentage}%;`
  }
  return '0%;'
})
</script>

<template>
  <div
    class="z-40 flex w-full flex-col items-center justify-between gap-7 rounded-lg bg-white py-4 px-7 shadow-md md:sticky md:top-2 md:flex-row"
  >
    <div class="flex-none text-center md:text-left">
      <p class="text-2xl font-bold">{{ props.alatTes }}</p>
      <p class="text-sm">{{ props.kelompokTes }}</p>
    </div>
    <div class="w-full flex-1">
      <div class="mb-1 flex flex-col items-center justify-between md:flex-row">
        <span class="text-base font-medium dark:text-white"
          >Progres Mengerjakan</span
        >
        <span class="text-sm font-medium dark:text-white"
          >{{ props.soalDikerjakan }} / {{ props.jumlahSoal }}</span
        >
      </div>
      <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          class="h-2.5 rounded-full bg-blue-600"
          :style="'width:' + soalPercentage"
        ></div>
      </div>
    </div>
    <div class="flex flex-none items-center gap-4">
      <button
        class="rounded-xl bg-amber-100 p-2 text-amber-600 outline-none hover:bg-amber-200 focus:ring focus:ring-amber-300 active:bg-amber-300"
        @click="$router.push({ name: 'psikotes_petunjuk' })"
      >
        <question-mark-circle-icon class="h-6 w-6" />
      </button>
      <div
        v-show="props.timer"
        class="group relative rounded-full bg-red-100 p-2 text-red-600"
      >
        <clock-icon class="h-6 w-6 animate-pulse" />
        <div
          class="absolute -bottom-9 left-1/2 hidden w-max -translate-x-1/2 transform rounded-lg bg-gray-800 px-3 py-1 text-sm text-white group-hover:block"
        >
          psikotes ini memiliki batas waktu
        </div>
      </div>
    </div>
  </div>
</template>
