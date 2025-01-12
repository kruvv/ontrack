import { NAV_ITEMS, HOURS_IN_DAY } from '@/constants.ts'

export function isPageValid(page: string): boolean {
  return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }: { hour: number }): boolean {
  return typeof hour === 'number' && hour >= 0 && hour < HOURS_IN_DAY
}
