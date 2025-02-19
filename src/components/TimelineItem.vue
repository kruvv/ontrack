<template>
  <li class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4">
    <TimelineHour
      :hour="timelineItem.hour"
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <BaseSelect
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="setTimelineItemActivity(timelineItem, $event)"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import { isTimelineItemValid, isHourValid } from '@/validators.ts'
import type { SelectOptionsType } from '@/validators.ts'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

const activitySelectOptions: SelectOptionsType[] = inject('activitySelectOptions')!
const setTimelineItemActivity = inject('setTimelineItemActivity')

const emit = defineEmits({
  scrollToHour: isHourValid,
})
</script>

<style scoped></style>
