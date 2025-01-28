<template>
  <button :class="`${typeClasses[type]} rounded  disabled:cursor-not-allowed disabled:opacity-50`">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { BUTTON_TYPE_PRIMARY, BUTTON_TYPE_DANGER, BUTTON_TYPE_NEUTRAL } from '@/constants.ts'

type TypeClasses = {
  [key: string]: string
}
const typeClasses: TypeClasses = {
  [BUTTON_TYPE_PRIMARY]: 'bg-purple-500 p-3 enabled:hover:bg-purple-600',
  [BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 p-3 enabled:hover:bg-gray-200',
  [BUTTON_TYPE_DANGER]: 'bg-red-500 p-3 enabled:hover:bg-red-600 text-white',
}
</script>

<script setup lang="ts">
import { isButtonTypeValid } from '@/validators.ts'

defineProps({
  type: {
    type: String,
    default: BUTTON_TYPE_PRIMARY,
    validator: isButtonTypeValid,
  },
})
</script>

<style lang="scss" scoped></style>
