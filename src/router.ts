import { ref } from 'vue'
import { isPageValid } from '@/validators.ts'
import TheTimeline from '@/pages/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities.vue'
import TheProgress from '@/pages/TheProgress.vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constants'

type PagesType = typeof TheTimeline | typeof TheProgress | typeof TheActivities
type RoutesType = {
  [key: string]: PagesType
}

export const routes: RoutesType = {
  [PAGE_TIMELINE]: TheTimeline,
  [PAGE_ACTIVITIES]: TheActivities,
  [PAGE_PROGRESS]: TheProgress,
}

export const currentPage = ref<string>(normalizePageHash())

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
