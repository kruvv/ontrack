<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div :class="getProgressColorClass(progress)" :style="`width: ${progress}%`"></div>
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ progress }}%</span><span>{{ timeProgress }}</span>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import { getActivityProgress } from '@/activities'
import { isActivityValid } from '@/validators'
import type { ActivityType } from '@/validators'
import { getProgressColorClass } from '@/functions'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  activity: {
    type: Object as PropType<ActivityType>,
    required: true,
    validator: isActivityValid,
  },
})

const timeProgress = ['03:00 / 30:00', '15:00 / 30:00', '21:00 / 30:00', '30:00 / 30:00'][
  props.index
]
const progress = computed(() => getActivityProgress(props.activity))
</script>

<style scoped></style>
