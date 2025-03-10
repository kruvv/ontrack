import { ref } from 'vue'
import type { ActivityType, TimelineItemType } from '@/validators'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants'
import { currentHour } from '@/functions'

export const timelineItemRefs = ref<TimelineItemType[]>([])

// Герерация часов каждый день
function generateTimeLineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null, //[1, 2, 3, 4, 5].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: 0, //[1, 2, 3, 4, 5].includes(hour) ? hour * 600 : 0,

    // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
    //    activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
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
      activitySeconds: 0,
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
  scrollToHour(currentHour(), isSmooth)
}

export function scrollToHour(hour: number, isSmooth: boolean = true) {
  // опция для выбора плавной или обычной прокрутки прокрутки
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}
