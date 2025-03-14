import { ref } from 'vue'
import { MILLISECONDS_IN_SECOND } from '@/constants.ts'

export function useStopwatch(initialSeconds: number) {
  const seconds = ref(initialSeconds)
  const isRunning = ref<boolean | number>(false)
  const temp = 1

  function start() {
    isRunning.value = setInterval(() => {
      seconds.value += temp
    }, MILLISECONDS_IN_SECOND)
  }

  function stop() {
    if (typeof isRunning.value === 'number') {
      clearInterval(isRunning.value)
    }
    isRunning.value = false
  }

  function reset() {
    stop()
    seconds.value = 0
  }

  return { seconds, isRunning, start, stop, reset }
}
