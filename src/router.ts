import { ref } from 'vue'
import { PAGE_TIMELINE } from './constants.ts'
import { isPageValid } from '@/validators.ts'
import type { TimelineItemType, SelectOptionsType, ActivityType } from '@/validators.ts'

export const currentPage = ref(normalizePageHash())

export function navigate(page: string) {
  document.body.scrollIntoView()

  currentPage.value = page
}

// Проверяем хеш в адресе страницы, если нужно нормализуем его к виду host/ontrack/#timeline
function normalizePageHash() {
  const page = window.location.hash.slice(1)
  if (isPageValid(page)) return page
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
