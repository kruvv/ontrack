import { ref } from 'vue'
import { activeTimelineItem, updateTimelineItem } from '@/timeline-items'
import { type TimelineItemType } from '@/validators'
import { MILLISECONDS_IN_SECOND } from '@/constants'

const timelineItemTimer = ref<boolean | number>(false)

export function startTimelineItemTimer(timelineItem?: TimelineItemType) {
    timelineItem = timelineItem ?? activeTimelineItem.value
    updateTimelineItem(timelineItem, {
        isActive: true,
    })

    timelineItemTimer.value = setInterval(() => {
        updateTimelineItem(timelineItem, {
            activitySeconds: timelineItem?.activitySeconds + 1,
        })
    }, MILLISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer() {
    updateTimelineItem(activeTimelineItem.value as TimelineItemType, {
        isActive: false,
    })

    if (typeof timelineItemTimer.value === 'number') {
        clearInterval(timelineItemTimer.value)
    }
    timelineItemTimer.value = false
}

export function resetTimelineItemTimer(timelineItem: TimelineItemType) {
    updateTimelineItem(timelineItem, {
        activitySeconds: 0,
    })
    if (activeTimelineItem.value) {
        stopTimelineItemTimer()
    }
}
