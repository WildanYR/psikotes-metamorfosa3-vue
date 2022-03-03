<script setup>
import { computed, ref } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const props = defineProps({
  modelValue: {
    type: Object
  },
  items: {
    type: Array,
    required: true
  },
  label: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const query = ref('')
const filteredItems = computed(() =>
  query.value === ''
    ? props.items
    : props.items.filter((item) =>
        item.text
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)

const updateValue = (val) => {
  emit('update:modelValue', val)
}
</script>
<template>
  <div>
    <p class="ml-1 text-sm">{{ props.label }}</p>
    <Combobox :model-value="props.modelValue" @update:model-value="updateValue">
      <div class="relative mt-1">
        <div
          class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            :display-value="
              (item) => (item?.text ? item.text : `Pilih ${props.label}`)
            "
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leave-from="opacity-100"
          leave-to="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredItems.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Tidak ditemukan
            </div>

            <ComboboxOption
              v-for="item in filteredItems"
              :key="item.value"
              v-slot="{ selected, active }"
              as="template"
              :value="item"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-teal-600 text-white': active,
                  'text-gray-900': !active
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ item.text }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
