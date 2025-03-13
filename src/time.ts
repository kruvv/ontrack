import { ref, computed } from 'vue'
import {
  HUNDRED_PERCENT,
  SECONDS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
} from '@/constants'

export const now = ref(new Date())
const midnight = computed(() => new Date(now.value).setHours(0, 0, 0, 0))

export const secondsSinceMidnightInPercentage = computed(
  () => (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY,
)

const secondsSinceMidnight = computed(
  () => (now.value.valueOf() - midnight.value) / MILLISECONDS_IN_SECOND,
)

let timer: number | null = null

export function startTimer() {
  now.value = new Date()
  timer = setInterval(() => {
    now.value = new Date(now.value.getTime() + SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND)
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimer() {
  if (typeof timer === 'number') {
    clearInterval(timer)
  }
}
