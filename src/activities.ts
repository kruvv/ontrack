import { ref, computed } from 'vue'
import { id } from '@/functions'
import type { SelectOptionsType, ActivityType } from '@/validators'
import { SECONDS_IN_HOUR } from '@/constants'

function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }))
}

// Генерация активностей
function generateActivitySelectOptions(activities: ActivityType[]) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

export const activities = ref<ActivityType[]>(generateActivities())

export const activitySelectOptions = computed<SelectOptionsType[]>(() =>
  generateActivitySelectOptions(activities.value),
)

export function deleteActivity(activity: ActivityType) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity: ActivityType) {
  activities.value.push(activity)
}

export function setActivitySecondsToComplete(
  activity: ActivityType,
  secondsToComplete: number,
): void {
  activity.secondsToComplete = secondsToComplete || 0
}
