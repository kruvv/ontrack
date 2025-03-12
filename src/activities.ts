import { ref, computed } from 'vue'
import { id } from '@/functions'
import type { SelectOptionsType, ActivityType } from '@/validators'
import { SECONDS_IN_HOUR, HUNDRED_PERCENT } from '@/constants'

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60, //hours * SECONDS_IN_HOUR,
  }))
}

// Генерация активностей
function generateActivitySelectOptions(activities: ActivityType[]) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

export const activities = ref<ActivityType[]>(generateActivities())

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)

export const activitySelectOptions = computed<SelectOptionsType[]>(() =>
  generateActivitySelectOptions(activities.value),
)

export function deleteActivity(activity: ActivityType) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity: ActivityType) {
  activities.value.push(activity)
}

export function updateActivity(activity: ActivityType, fields: { secondsToComplete: number }) {
  return Object.assign(activity, fields)
}

export function calculateActivityCompletionPercentage(
  { secondsToComplete }: ActivityType,
  trackedSeconds: number,
) {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds: number) {
  return Math.floor(
    (totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value,
  )
}
