<template>
  <button :class="`${typeClasses[type]} rounded  disabled:cursor-not-allowed disabled:opacity-50`">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_NAUTRAL } from '@/constants.ts'

const typeClasses = {
  [BUTTON_TYPE_NAUTRAL]: 'bg-gray-100 p-3 enabled:hover:bg-gray-200',
  [BUTTON_TYPE_DANGER]: 'bg-red-500 p-3 enabled:hover:bg-red-600 text-white',
}
</script>

<script setup lang="ts">
import { isButtonTypeValid } from '@/validators.ts'

defineProps({
  type: {
    type: String,
    default: BUTTON_TYPE_NAUTRAL,
    validator: isButtonTypeValid,
  },
})
</script>

<style lang="scss" scoped></style>
