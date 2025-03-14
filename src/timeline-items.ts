import { ref } from 'vue'
import type { ActivityType, TimelineItemType } from '@/validators'
import { HOURS_IN_DAY, MIDNIGHT_HOUR, MILLISECONDS_IN_SECOND } from '@/constants'
import { now } from '@/time'

export const timelineItemRefs = ref([])

let timelineItemTimer: number | null = null

export function startTimelineItemTimer(activeTimelineItem) {
  timelineItemTimer = setInterval(() => {
    updateTimelineItem(activeTimelineItem, {
      activitySeconds: activeTimelineItem?.activitySeconds + 1,
    })
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer() {
  if (typeof timelineItemTimer === 'number') {
    clearInterval(timelineItemTimer)
  }
}

export function findActiveTimelineItem() {
  return timelineItems.value.find(({ isActive }) => isActive)
}

// Герерация часов каждый день
function generateTimeLineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    isActive: false,
  }))
}

export const timelineItems = ref<TimelineItemType[]>(generateTimeLineItems())

function filterTimelineItemsByActivity(timelineItems: TimelineItemType[], { id }: ActivityType) {
  return timelineItems.filter(({ activityId }) => activityId === id)
}

type FieldsType = {
  [key: string]: string | number | null
}

export function updateTimelineItem(timelineItem: TimelineItemType, fields: FieldsType) {
  return Object.assign(timelineItem, fields)
}

export function resetTimelineItemActivities(
  timelineItems: TimelineItemType[],
  activity: ActivityType,
) {
  filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem) =>
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds:
        timelineItem.hour === now.value.getHours() ? timelineItem.activitySeconds : 0,
    }),
  )
}

export function calculateTrackedActivitySeconds(
  timelineItems: TimelineItemType[],
  activity: ActivityType,
) {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

export function scrollToCurrentHour(isSmooth: boolean = false) {
  scrollToHour(now.value.getHours(), isSmooth)
}
export function scrollToHour(hour: number, isSmooth: boolean = true) {
  // опция для выбора плавной или обычной прокрутки прокрутки
  //debugger
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}
