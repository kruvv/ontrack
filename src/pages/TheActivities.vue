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
import { inject } from 'vue'
import ActivityItem from '@/components/ActivityItem.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue'
import { isActivityValid, isNumber } from '@/validators.ts'

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
  setActivitySecondsToComplete(activity, secondsToComplete) {
    return [isActivityValid(activity), isNumber(secondsToComplete)].every(Boolean)
  },
})

const activities = inject('activities')

function setSecondsToComplete(activity, secondsToComplete) {
  emit('setActivitySecondsToComplete', activity, secondsToComplete)
}
</script>

<style scoped></style>
