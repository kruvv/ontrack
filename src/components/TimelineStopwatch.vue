<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="isStartButtonDisabled" @click="start">
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PropType } from 'vue'
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/BaseButton.vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_SUCCESS,
  MILLISECONDS_IN_SECOND,
} from '@/constants.ts'
import { isTimelineItemValid } from '@/validators'
import type { TimelineItemType } from '@/validators'
import { formatSeconds, currentHour } from '@/functions'
import { updateTimelineItem } from '@/timeline-items'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object as PropType<TimelineItemType>,
    validator: isTimelineItemValid,
  },
})

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref(false)

const isStartButtonDisabled = props.timelineItem.hour !== currentHour()

watch(
  () => props.timelineItem.activityId,
  () => updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value }),
)

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItem(props.timelineItem, {
      activitySeconds: props.timelineItem.activitySeconds + 1,
    })
    seconds.value++
  }, MILLISECONDS_IN_SECOND)
}
function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false
}
function reset() {
  stop()
  updateTimelineItem(props.timelineItem, {
    activitySeconds: props.timelineItem.activitySeconds - seconds.value,
  })
  seconds.value = 0
}
</script>

<style scoped></style>
