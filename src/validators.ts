import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGHT_HOUR, BUTTON_TYPES } from '@/constants.ts'

export type SelectOptionsType = {
  value: number | string
  label: string
}

export type TimelineItemType = {
  hour: number
  activityId: string | null
  activitySeconds: number
}

export type ActivityType = {
  id: string
  name: string
  secondsToComplete: number
}

//FIXME: добавить тип иконки
export type NavItemType = {
  page: string
  icon: SVGGraphicsElement
}

export function isNavItemValid(navItem: NavItemType) {
  return NAV_ITEMS.includes(navItem)
}

export function isPageValid(page: string): boolean {
  return NAV_ITEMS.some((navItem) => navItem.page === page)
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
  if (typeof value === 'number') {
    return isNumber(value) && isNotEmptyString(label)
  } else {
    return isNotEmptyString(value) && isNotEmptyString(label)
  }
}

export function validateTimelineItems(timelineItems: TimelineItemType[]) {
  return timelineItems.every(isTimelineItemValid)
}

export function isUndefinedOrNull(value?: number) {
  return isUndefined(value) || isNull(value)
}

export function isNumberOrNull(value: number | null) {
  return typeof value === 'number' ? isNumber(value) : isNull(value)
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
  if (id === null) return true
  return [isNotEmptyString(id), isNotEmptyString(name), isNumber(secondsToComplete)].every(Boolean)
}

function isNotEmptyString(value: string) {
  return isString(value) && value.length > 0
}

export function validateActivities(activities: ActivityType[]) {
  return activities.every(isActivityValid)
}

export function isSelectValueValid(value: string | number | null) {
  return typeof value === 'string' ? isNotEmptyString(value) : isNumberOrNull(value)
}
