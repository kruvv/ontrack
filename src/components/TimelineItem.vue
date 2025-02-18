<template>
  <li class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" @click.prevent="emit('scrollToHour', timelineItem.hour)" />
    <BaseSelect :selected="timelineItem.activityId" :options="activitySelectOptions" placeholder="Rest"
      @select="selectActivity" />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import { isTimelineItemValid, isActivityValid, isHourValid } from '@/validators.ts'
import { NULLABLE_ACTIVITY } from '@/constants.ts'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

const activities = inject('activities')
const activitySelectOptions = inject('activitySelectOptions')

const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid,
})

function selectActivity(id) {
  emit('selectActivity', findActivityById(id))
}

function findActivityById(id) {
  return activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}
</script>

<style scoped></style>
