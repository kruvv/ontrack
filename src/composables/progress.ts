import { computed } from 'vue'
import { getProgressColorClass } from '@/functions'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'
import { calculateActivityCompletionPercentage } from '@/activities'
import type { ActivityType } from '@/validators'

export function useProgress(activity: ActivityType) {
  const colorClass = computed(() => getProgressColorClass(percentage.value))
  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value),
  )

  const trackedActivitySeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity),
  )
  return {
    percentage,
    trackedActivitySeconds,
    colorClass,
  }
}
