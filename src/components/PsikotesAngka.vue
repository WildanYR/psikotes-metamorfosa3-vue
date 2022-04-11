<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'

const props = defineProps({
  modelValue: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])

const metaValue = ref([
  { value: '0', selected: false },
  { value: '1', selected: false },
  { value: '2', selected: false },
  { value: '3', selected: false },
  { value: '4', selected: false },
  { value: '5', selected: false },
  { value: '6', selected: false },
  { value: '7', selected: false },
  { value: '8', selected: false },
  { value: '9', selected: false }
])

const updateSelected = (index) => {
  metaValue.value[index].selected = !metaValue.value[index].selected
  const valStr = metaValue.value
    .filter((v) => v.selected)
    .map((v) => v.value)
    .join('')
  emit('update:modelValue', valStr)
}

const syncValue = () => {
  if (props.modelValue) {
    const valArr = props.modelValue.split('')
    metaValue.value = metaValue.value.map((m) => ({
      value: m.value,
      selected: valArr.includes(m.value)
    }))
  }
}

onMounted(() => {
  syncValue()
})
</script>

<template>
  <div
    class="grid auto-cols-max grid-cols-3 items-center gap-3 md:grid-cols-10"
  >
    <button
      v-for="(val, i) in metaValue"
      :key="i"
      :class="[
        'rounded-xl p-3',
        val.selected ? 'bg-blue-500 font-bold text-white' : 'bg-gray-200'
      ]"
      @click="updateSelected(i)"
    >
      {{ val.value }}
    </button>
  </div>
</template>
