<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="select(null)">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl"
      @change="select(($event.target as HTMLInputElement).value)">
      <option :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>
      <option v-for="{ value, label } in options" :key="value" :value="value" :selected="value === selected">
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { validateSelectOptions, isUndefinedOrNull, isSelectValueValid } from '@/validators.ts'
import type { SelectOptionsType } from '@/validators.ts'
import { normalizeSelectValue } from '@/functions.ts'
import { BUTTON_TYPE_NEUTRAL } from '@/constants.ts'

const emit = defineEmits({
  select: isSelectValueValid,
})
// type SelectType = {
//   selected: number | null
// }
const props = defineProps({
  selected: [String, Number] /* as PropType<SelectType>*/,
  options: {
    type: Array as PropType<SelectOptionsType[]>,
    required: true,
    validator: validateSelectOptions,
  },
  placeholder: { type: String, required: true },
})

const isNotSelected = computed(() => {
  return isUndefinedOrNull(props.selected)
})

function select(value) {
  // debugger
  emit('select', normalizeSelectValue(value))
}
</script>

<style scoped></style>
