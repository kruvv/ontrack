import { APP_NAME } from '@/constants'
import { today, isToday, endOfHour, toSeconds } from '@/time'
import { activeTimelineItem, resetTimelineItems, timelineItems } from '@/timeline-items'
import { activities } from '@/activities'
import type { TimelineItemType } from './validators'
import { startTimelineItemTimer, stopTimelineItemTimer } from './timeline-item-timer'

export function syncState(shouldLoad = true) {
  //eslint-disable-next-line
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    //eslint-disable-next-line
    shouldLoad
      ? startTimelineItemTimer(activeTimelineItem.value)
      : stopTimelineItemTimer(activeTimelineItem.value)
  }
}

// Загружает состояние из localStorage
export function loadState() {
  const serialiazedState = localStorage.getItem(APP_NAME)

  const state = serialiazedState ? JSON.parse(serialiazedState) : {}
  activities.value = state.activities || activities.value

  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? timelineItems.value

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    timelineItems.value = syncIdleSeconds(state.timelineItems, lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    timelineItems.value = resetTimelineItems(state.timelineItems)
  }
  // timelineItems.value = isToday(lastActiveAt)
  //   ? syncIdleSeconds(state.timelineItems, lastActiveAt)
  //   : timelineItems.value
}

// Сохраняет состояние при покидании вкладки Timeline
export function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today(),
    }),
  )
}

function syncIdleSeconds(timelineItems: TimelineItemType[], lastActiveAt: Date) {
  const activeTimelineItem = timelineItems.find(({ isActive }) => isActive)

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt)
  }
  return timelineItems
}

function calculateIdleSeconds(lastActiveAt: Date) {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(today().valueOf() - lastActiveAt.valueOf())
    : toSeconds(endOfHour(lastActiveAt).valueOf() - lastActiveAt.valueOf())
}
