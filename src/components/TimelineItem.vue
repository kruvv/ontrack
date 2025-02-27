<template>
  <li class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour')" />
    <BaseSelect :selected="timelineItem.activityId" :options="activitySelectOptions" placeholder="Rest"
      @select="updateTimelineItem(timelineItem, { activityId: $event })" />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import { isTimelineItemValid, isUndefined } from '@/validators'
import type { TimelineItemType } from '@/validators'
import { updateTimelineItem } from '@/timeline-items'
import { activitySelectOptions } from '@/activities'

defineProps({
  timelineItem: {
    type: Object as PropType<TimelineItemType>,
    required: true,
    validator: isTimelineItemValid,
  },
})

const emit = defineEmits({
  scrollToHour: isUndefined,
})
</script>

<style scoped></style>
