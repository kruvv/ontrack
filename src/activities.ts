import { ref, computed } from 'vue'
import type { SelectOptionsType, ActivityType } from '@/validators'
import { HUNDRED_PERCENT } from '@/constants'
import type { StateType } from '@/storage'
import type { FieldsType } from '@/timeline-items'

const totalActivitySecondsToComplete = computed(() => {
    return trackedActivities.value
        .map(({ secondsToComplete }) => secondsToComplete)
        .reduce((total, seconds) => total + seconds, 0)
})

function generateActivitySelectOptions(activities: ActivityType[]) {
    return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}

export const activities = ref<ActivityType[]>([])

export const trackedActivities = computed(() =>
    activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)

export const activitySelectOptions = computed<SelectOptionsType[]>(() =>
    generateActivitySelectOptions(activities.value),
)

export function initializeActivities(state: StateType) {
    activities.value = state.activities || []
}

export function deleteActivity(activity: ActivityType) {
    activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity: ActivityType) {
    activities.value.push(activity)
}

export function updateActivity(activity: ActivityType, fields: FieldsType) {
    return Object.assign(activity, fields)
}

export function calculateActivityCompletionPercentage(
    { secondsToComplete }: { secondsToComplete: number },
    trackedSeconds: number,
) {
    return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds: number) {
    return Math.floor(
        (totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value,
    )
}
