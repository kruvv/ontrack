<template>
  <li class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect :selected="timelineItem.activityId" :options="activitySelectOptions" placeholder="Rest"
      @select="selectActivity" />
  </li>
</template>

<script setup lang="ts">
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import {
  isTimelineItemValid,
  validateSelectOptions,
  isActivityValid,
  validateActivities,
  isNull,
} from '@/validators.ts'

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
  selectActivity(activity) {
    return isNull(activity) || isActivityValid(activity)
  },
})

function selectActivity(id) {
  emit('selectActivity', props.activities.find((activity) => activity.id === id) || null)
}
</script>

<style scoped></style>
