<template>
  <li class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect :selected="timelineItem.activityId" :options="activitySelectOptions" placeholder="Rest"
      @select="selectActivity" />
    <TimelineStopwatch :seconds="timelineItem.activitySeconds" :hour="timelineItem.hour" />
  </li>
</template>

<script setup lang="ts">
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import {
  isTimelineItemValid,
  validateSelectOptions,
  isActivityValid,
  validateActivities,
} from '@/validators.ts'
import { NULLABLE_ACTIVITY } from '@/constants.ts'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
  activities: {
    type: Array,
    requered: true,
    validator: validateActivities,
  },
})

const emit = defineEmits({
  selectActivity: isActivityValid,
})

function selectActivity(id) {
  emit('selectActivity', findActivityById(id))
}

function findActivityById(id) {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>

<style scoped></style>
