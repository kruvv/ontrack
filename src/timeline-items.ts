import { computed, ref, watch } from 'vue'
import type { ActivityType, TimelineItemType } from '@/validators'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants'
import { endOfHour, isToday, now, today, toSeconds } from '@/time'
import { stopTimelineItemTimer } from './timeline-item-timer'
import type { StateType } from './storage'

export const timelineItemRefs = ref([])
export const timelineItems = ref<TimelineItemType[]>([])

export const activeTimelineItem = computed(() =>
    timelineItems.value.find(({ isActive }) => isActive),
)

watch(now, (after, before) => {
    // Останавливаем таймер если он запущен
    if (activeTimelineItem.value && activeTimelineItem.value.hour !== after.getHours()) {
        stopTimelineItemTimer()
    }

    // Сбрасываем время всех активностей после наступления полночи.
    if (before.getHours() !== after.getHours() && after.getHours() === MIDNIGHT_HOUR) {
        resetTimelineItems()
    }
})

export function initializeTimelineItems(state: StateType) {
    const lastActiveAt = new Date(state.lastActiveAt)

    timelineItems.value = state.timelineItems ?? generateTimeLineItems()

    if (activeTimelineItem.value && isToday(lastActiveAt)) {
        syncIdleSeconds(lastActiveAt)
    } else if (state.timelineItems && !isToday(lastActiveAt)) {
        resetTimelineItems()
    }
}

export type FieldsType = {
    [key: string]: string | boolean | number | null
}

export function updateTimelineItem(timelineItem: TimelineItemType, fields: FieldsType) {
    debugger
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
                timelineItem.hour === today().getHours() ? timelineItem.activitySeconds : 0,
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
    scrollToHour(today().getHours(), isSmooth)
}

export function scrollToHour(hour: number, isSmooth: boolean = true) {
    // опция для выбора плавной или обычной прокрутки прокрутки
    // debugger
    const el: HTMLElement =
        hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
    el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}

function filterTimelineItemsByActivity(timelineItems: TimelineItemType[], { id }: ActivityType) {
    return timelineItems.filter(({ activityId }) => activityId === id)
}

function resetTimelineItems() {
    timelineItems.value.forEach((timelineItem) =>
        updateTimelineItem(timelineItem, {
            activitySeconds: 0,
            isActive: false,
        }),
    )
}

function syncIdleSeconds(lastActiveAt: Date) {
    updateTimelineItem(activeTimelineItem.value as TimelineItemType, {
        activitySeconds:
            (activeTimelineItem.value as TimelineItemType).activitySeconds +
            calculateIdleSeconds(lastActiveAt),
    })
}

function calculateIdleSeconds(lastActiveAt: Date) {
    return lastActiveAt.getHours() === today().getHours()
        ? toSeconds(today().valueOf() - lastActiveAt.valueOf())
        : toSeconds(endOfHour(lastActiveAt).valueOf() - lastActiveAt.valueOf())
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
