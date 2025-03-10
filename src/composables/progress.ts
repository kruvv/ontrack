import { computed } from 'vue'
import { getProgressColorClass } from '@/functions'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'
import { calculateActivityCompletionPercentage } from '@/activities'
import type { ActivityType } from '@/validators'

export function useProgress(activity: ActivityType) {
  const colorClass = computed(() => getProgressColorClass(percentage.value))
  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedSeconds.value),
  )

  const trackedSeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity),
  )
  return {
    percentage,
    trackedSeconds,
    colorClass,
  }
}
