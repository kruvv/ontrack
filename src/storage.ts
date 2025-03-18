import { APP_NAME } from '@/constants'
import { today } from '@/time'
import { activeTimelineItem, initializeTimelineItems, timelineItems } from '@/timeline-items'
import { activities, initializeActivities } from '@/activities'
import { startTimelineItemTimer, stopTimelineItemTimer } from './timeline-item-timer'
import type { ActivityType, TimelineItemType } from './validators'

export type StateType = {
  timelineItems: TimelineItemType[]
  activities: ActivityType[]
  lastActiveAt: string
}

export function syncState(shouldLoad = true) {
  //eslint-disable-next-line
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    //eslint-disable-next-line
    shouldLoad ? startTimelineItemTimer() : stopTimelineItemTimer()
  }
}

// Загружает состояние из localStorage и производит инициализацию.
function loadState() {
  // Загрузка состояния из localStorage
  const state = loadFromLocalStorage()

  // initialize activities
  initializeActivities(state)

  //initialize timelineItems
  initializeTimelineItems(state)
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(APP_NAME) ?? '{}')
}

// Сохраняет состояние при покидании вкладки Timeline
function saveState() {
  localStorage.setItem(
    APP_NAME,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today(),
    }),
  )
}
