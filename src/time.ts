import { ref, computed } from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_HOUR,
} from '@/constants'

export function today() {
  const today = new Date()
  // today.setHours(0, 0)
  return today
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

export const now = ref(today())
const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
)

const secondsSinceMidnight = computed(
  () => (now.value.valueOf() - midnight.value) / MILLISECONDS_IN_SECOND,
)

let currentDayTimer: number | null = null

export function startCurrentDateTimer() {
  now.value = today()
  currentDayTimer = setInterval(() => {
    now.value = new Date(now.value.getTime() + MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopCurrentDateTimer() {
  if (typeof currentDayTimer === 'number') {
    clearInterval(currentDayTimer)
  }
}
