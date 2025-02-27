import { ref } from 'vue'
import type { ActivityType, TimelineItemType } from '@/validators'
import { HOURS_IN_DAY } from '@/constants'
import { activities } from '@/activities'

// Герерация часов каждый день
function generateTimeLineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [1, 2, 3, 4, 5].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: [1, 2, 3, 4, 5].includes(hour) ? hour * 600 : 0,

    // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
    //    activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR,
  }))
}

export const timelineItems = ref<TimelineItemType[]>(generateTimeLineItems())

function hasActivity(timelineItem: TimelineItemType, activity: ActivityType) {
  return timelineItem.activityId === activity.id
}

type FieldsType = {
  [key: string]: string | number | null
}

export function updateTimelineItem(timelineItem: TimelineItemType, fields: FieldsType) {
  return Object.assign(timelineItem, fields)
}

// TODO: Delete it
// export function setTimelineItemActivity(
//   timelineItem: TimelineItemType,
//   activityId: string | null,
// ): void {
//   // debugger debugger
//   timelineItem.activityId = activityId
// }
//
// export function updateTimelineItemActivitySeconds(
//   timelineItem: TimelineItemType,
//   activitySeconds: number,
// ): void {
//   timelineItem.activitySeconds = activitySeconds
// }

export function resetTimelineItemActivities(activity: ActivityType) {
  timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .forEach((timelineItem) =>
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds: 0,
      }),
    )
}

export function getTotalActivitySeconds(activity: ActivityType) {
  return timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .reduce(
      (totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds),
      0,
    )
}
