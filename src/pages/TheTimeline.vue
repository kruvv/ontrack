<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineitem in timelineItems"
        :key="timelineitem.hour"
        :timeline-item="timelineitem"
        :activity-select-options="activitySelectOptions"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { validateTimelineItems, validateSelectOptions } from '@/validators.ts'
import type { TimelineItemType } from '@/validators.ts'
import type { PropType } from 'vue'

defineProps({
  timelineItems: {
    type: Array as PropType<TimelineItemType[]>,
    required: true,
    validator: validateTimelineItems,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
})
</script>

<style scoped></style>
