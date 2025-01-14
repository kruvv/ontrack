import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants.ts'

type SelectOptions = {
  value: number
  label: string
}

export function isPageValid(page: string): boolean {
  return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }: { hour: number }): boolean {
  return typeof hour === 'number' && hour >= MIDNIGHT_HOUR && hour < HOURS_IN_DAY
}
export function validateSelectOptions(options: SelectOptions[]) {
  return options.every(isSelectOptionValid)
}
function isSelectOptionValid({ value, label }: SelectOptions) {
  return typeof value === 'number' && typeof label === 'string'
}

export function validateTimelineItems(timelineItems) {
  return timelineItems.every(isTimelineItemValid)
}
