import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants.ts'

type SelectOptions = {
  value: number
  label: string
}

export type TimelineItem = {
  hour: number
}

export function isPageValid(page: string): boolean {
  return Object.keys(NAV_ITEMS).includes(page)
}

export function isTimelineItemValid({ hour }: TimelineItem) {
  return isHourValid(hour)
}

export function validateSelectOptions(options: SelectOptions[]) {
  return options.every(isSelectOptionValid)
}

function isSelectOptionValid({ value, label }: SelectOptions) {
  return isNumber(value) && isString(label)
}

export function validateTimelineItems(timelineItems: TimelineItem[]) {
  return timelineItems.every(isTimelineItemValid)
}

export function isUndefinedOrNull(value?: number) {
  return isUndefined(value) || isNull(value)
}

export function isNumberOrNull(value: number | null) {
  if (typeof value === 'number') return isNumber(value)
  if (value === null) return isNull(value)
}

function isNull(value: number | null) {
  return value === null
}

function isUndefined(value: number | undefined) {
  return value === undefined
}

function isNumber(value: number) {
  return typeof value === 'number'
}

function isString(value: string) {
  return typeof value === 'string'
}

function isBetween(value: number, start: number, end: number) {
  return value >= start && value <= end
}

export function isHourValid(hour: number) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY)
}

export function isActivityValid(value: string) {
  return isNotEmptyString(value)
}

function isNotEmptyString(value: string) {
  return isString(value) && value.length > 0
}

export function validateActivities(activities: string[]) {
  return activities.every(isActivityValid)
}
