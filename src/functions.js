import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'

// Проверяем хеш в адресе страницы, если нужно нормализуем его к виду host/ontrack/#timeline
export function normalizePageHash() {
  const hash = window.location.hash.slice(1)
  if ([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(hash)) return hash
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
