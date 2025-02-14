<template>
  <div class="flex flex-col grow">
    <ul v-if="activities?.length > 0" class="divide-y grow">
      <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity"
        :timeline-items="timelineItems" @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="setSecondsToComplete(activity, $event)" />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>

<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue'
import {
  validateActivities,
  isActivityValid,
  isNumber,
  validateTimelineItems,
} from '@/validators.ts'
import type { ActivityType, TimelineItemType } from '@/validators.ts'
import type { PropType } from 'vue'

defineProps({
  activities: {
    type: Array as PropType<ActivityType[]>,
    requered: true,
    validator: validateActivities,
  },
  timelineItems: {
    type: Array as PropType<TimelineItemType[]>,
    required: true,
    validator: validateTimelineItems,
  },
})

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
  setActivitySecondsToComplete(activity, secondsToComplete) {
    return [isActivityValid(activity), isNumber(secondsToComplete)].every(Boolean)
  },
})

function setSecondsToComplete(activity, secondsToComplete) {
  emit('setActivitySecondsToComplete', activity, secondsToComplete)
}
</script>

<style scoped></style>
