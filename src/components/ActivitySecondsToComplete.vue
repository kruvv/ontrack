<template>
  <div :class="classes">
    {{ seconds }}
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { formatSeconds, getTotalActivitySeconds } from '@/functions.ts'
import { isActivityValid } from '@/validators.ts'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

const timelineItems = inject('timelineItems')

const classes = computed(
  () =>
    `flex items-center rounded bg-purple-100 px-2 font-mono text-xl text-purple-600 ${colorClasses.value}`,
)

const colorClasses = computed(() =>
  secondsDiff.value < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
)

const seconds = computed(() => `${sign.value}${formatSeconds(secondsDiff.value)}`)

const sign = computed(() => (secondsDiff.value >= 0 ? '+' : '-'))

const secondsDiff = computed(
  () => getTotalActivitySeconds(props.activity, timelineItems) - props.activity.secondsToComplete,
)
</script>

<style scoped></style>
