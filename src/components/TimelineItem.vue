<template>
  <li class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />
    <BaseSelect :selected="timelineItem.activityId" :options="activitySelectOptions" placeholder="Rest"
      @select="setTimelineItemActivity(timelineItem, $event)" />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import { isTimelineItemValid, isUndefined } from '@/validators.ts'
import type { SelectOptionsType } from '@/validators.ts'
import { activitySelectOptionsKey, setTimelineItemActivityKey } from '@/keys.ts'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

const activitySelectOptions: SelectOptionsType[] = inject(activitySelectOptionsKey)
const setTimelineItemActivity = inject(setTimelineItemActivityKey)

const emit = defineEmits({
  scrollToHour: isUndefined,
})
</script>

<style scoped></style>
