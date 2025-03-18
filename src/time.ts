import { ref, computed } from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_HOUR,
} from '@/constants'

export const now = ref(today())
const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
)

const secondsSinceMidnight = computed(
  () => (now.value.valueOf() - midnight.value) / MILLISECONDS_IN_SECOND,
)

export function today() {
  return new Date()
}

export function tomorrow() {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow
}

export function endOfHour(date: Date) {
  const endOfHour = new Date(date)

  endOfHour.setTime(endOfHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)
  endOfHour.setMinutes(0, 0, 0)
  return endOfHour
}

export function toSeconds(milliseconds: number) {
  return Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}

export function isToday(date: Date) {
  return date.toDateString() === today().toDateString()
}

export function startCurrentDateTimer() {
  setInterval(() => (now.value = today()), MILLISECONDS_IN_SECOND)
}
