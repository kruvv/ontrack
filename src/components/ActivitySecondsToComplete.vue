<template>
  <div :class="classes">
    {{ seconds }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatSeconds, getTotalActivitySeconds } from '@/functions.ts'
import { isActivityValid, validateTimelineItems } from '@/validators.ts'
import type { TimelineItemType } from '@/validators.ts'
import type { PropType } from 'vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
  timelineItems: {
    type: Array as PropType<TimelineItemType[]>,
    required: true,
    validator: validateTimelineItems,
  },
})

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
  () =>
    getTotalActivitySeconds(props.activity, props.timelineItems) - props.activity.secondsToComplete,
)
</script>

<style scoped></style>
