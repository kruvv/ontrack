import { computed } from 'vue'
import { getProgressColorClass } from '@/functions'
import { timelineItems, calculateTrackedActivitySeconds } from '@/timeline-items'
import { calculateCompletionPercentage, trackedActivities } from '@/activities'

export function useTotalProgress() {
    const colorClass = computed(() => getProgressColorClass(percentage.value))

    const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

    const totalTrackedSeconds = computed(() => {
        return trackedActivities.value
            .map((activity) =>
                Math.min(
                    calculateTrackedActivitySeconds(timelineItems.value, activity),
                    activity.secondsToComplete,
                ),
            )
            .reduce((total, seconds) => {
                return total + seconds
            }, 0)
    })
    return {
        percentage,
        colorClass,
    }
}
