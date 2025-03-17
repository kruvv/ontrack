import { ref, watchEffect } from 'vue'
import { activeTimelineItem, updateTimelineItem } from './timeline-items'
import { now } from './time'
import { type TimelineItemType } from './validators'
import { MILLISECONDS_IN_SECOND } from './constants'

export const timelineItemTimer = ref<boolean | number>(false)

export function startTimelineItemTimer(timelineItem: TimelineItemType) {
  updateTimelineItem(timelineItem, {
    isActive: true,
  })

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem?.activitySeconds + 1,
    })
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer(timelineItem: TimelineItemType) {
  updateTimelineItem(timelineItem, {
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
  stopTimelineItemTimer(timelineItem)
}

watchEffect(() => {
  // Отслеживаем изменение часа, если один из секундомеров был запущен
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== now.value.getHours()) {
    stopTimelineItemTimer(activeTimelineItem.value)
  }
})
