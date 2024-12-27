import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS, HOURS_IN_DAY } from '@/constants.ts'

// Проверяем хеш в адресе страницы, если нужно нормализуем его к виду host/ontrack/#timeline
export function normalizePageHash() {
  const hash = window.location.hash.slice(1)
  if ([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(hash)) return hash
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
// Герерация часов каждый день
export function generateTimeLineItems() {
  const timeItems = []

  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
    timeItems.push({ hour })
  }
  return timeItems
}
