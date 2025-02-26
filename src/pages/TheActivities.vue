<template>
  <div class="flex flex-col grow">
    <ul v-if="activities?.length > 0" class="divide-y grow">
      <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity"
        @delete="emit('deleteActivity', activity)" @set-seconds-to-complete="setSecondsToComplete(activity, $event)" />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>

<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue'
import { activities } from '@/activities'
import { isActivityValid, isNumber } from '@/validators'
import type { ActivityType } from '@/validators'

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
  setActivitySecondsToComplete(activity: ActivityType, secondsToComplete: number) {
    return [isActivityValid(activity), isNumber(secondsToComplete)].every(Boolean)
  },
})

function setSecondsToComplete(activity: ActivityType, secondsToComplete: number) {
  emit('setActivitySecondsToComplete', activity, secondsToComplete)
}
</script>

<style scoped></style>
