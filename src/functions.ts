import { PAGE_TIMELINE, HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants.ts'
import { isPageValid } from '@/validators.ts'
import type { TimelineItem } from '@/validators.ts'

// Проверяем хеш в адресе страницы, если нужно нормализуем его к виду host/ontrack/#timeline
export function normalizePageHash() {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) return page
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}

// Герерация часов каждый день
export function generateTimeLineItems() {
  const timeItems: TimelineItem[] = []

  for (let hour = MIDNIGHT_HOUR; hour < HOURS_IN_DAY; hour++) {
    timeItems.push({ hour })
  }
  return timeItems
}

// Генерация активностей
export function generateActivitySelectOptions(activities: string[]) {
  return activities.map((label, value) => ({ label, value }))
}
