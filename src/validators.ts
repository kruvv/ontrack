import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR, BUTTON_TYPES } from '@/constants.ts'

export type SelectOptionsType = {
  value: number | string
  label: string
}

export type TimelineItemType = {
  hour: number
  activityId: string | null
}

export type ActivityType = {
  id: string
  name: string
  secondsToComplete: number
}

export function isPageValid(page: string): boolean {
  return Object.keys(NAV_ITEMS).includes(page)
}

export function isButtonTypeValid(type: string) {
  return BUTTON_TYPES.includes(type)
}

export function isTimelineItemValid({ hour }: TimelineItemType) {
  return isHourValid(hour)
}

export function isHourValid(hour: number) {
  return isNumber(hour) && isBetween(hour, MIDNIGHT_HOUR, HOURS_IN_DAY)
}

export function validateSelectOptions(options: SelectOptionsType[]) {
  return options.every(isSelectOptionValid)
}

function isSelectOptionValid({ value, label }: SelectOptionsType) {
  return (isNumber(value) || isNotEmptyString(value)) && isNotEmptyString(label)
}

export function validateTimelineItems(timelineItems: TimelineItemType[]) {
  return timelineItems.every(isTimelineItemValid)
}

export function isUndefinedOrNull(value?: number) {
  return isUndefined(value) || isNull(value)
}

export function isNumberOrNull(value: number | null) {
  if (typeof value === 'number') return isNumber(value)
  if (value === null) return isNull(value)
}

export function isNull(value: number | null) {
  return value === null
}

export function isUndefined(value: number | undefined) {
  return value === undefined
}

export function isNumber(value: number) {
  return typeof value === 'number'
}

function isString(value: string) {
  return typeof value === 'string'
}

function isBetween(value: number, start: number, end: number) {
  return value >= start && value <= end
}

export function isActivityValid({ id, name, secondsToComplete }: ActivityType) {
  if (isNull(id)) {
    return true
  }
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

function isNotEmptyString(value: string) {
  return isString(value) && value.length > 0
}

export function validateActivities(activities: ActivityType[]) {
  return activities.every(isActivityValid)
}

export function isSelectValueValid(value) {
  return isNotEmptyString(value) || isNumberOrNull(value)
}
