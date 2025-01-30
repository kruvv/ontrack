import { PAGE_TIMELINE, HOURS_IN_DAY, MIDNIGHT_HOUR, SECONDS_IN_HOUR } from '@/constants.ts'
import { isPageValid } from '@/validators.ts'
import type { TimelineItemType, ActivityType } from '@/validators.ts'

// Проверяем хеш в адресе страницы, если нужно нормализуем его к виду host/ontrack/#timeline
export function normalizePageHash() {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) return page
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

export function generateActivities() {
  return ['Coding', 'Training', 'Reading'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }))
}

// Генерация случайного id
export function id() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Герерация часов каждый день
export function generateTimeLineItems() {
  const timeItems: TimelineItemType[] = []

  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
    timeItems.push({ hour })
  }
  return timeItems
}

// Генерация активностей
export function generateActivitySelectOptions(activities: ActivityType[]) {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }))
}
