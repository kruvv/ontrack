<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!timelineItem.activitySeconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton v-else :type="BUTTON_TYPE_SUCCESS" :disabled="timelineItem.hour !== now.getHours()" @click="start">
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { watch, watchEffect, type PropType, onMounted } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_WARNING, BUTTON_TYPE_SUCCESS } from '@/constants'
import { isTimelineItemValid, type TimelineItemType } from '@/validators'
import { formatSeconds } from '@/functions'
import { ICON_PLAY, ICON_PAUSE, ICON_ARROW_PATH } from '@/icons'
import { useStopwatch } from '@/composables/stopwatch'
import { updateTimelineItem } from '@/timeline-items'
import { now } from '@/time'

const props = defineProps({
  timelineItem: {
    required: true,
    type: Object as PropType<TimelineItemType>,
    validator: isTimelineItemValid,
  },
})

const { seconds, isRunning, start, stop, reset } = useStopwatch(props.timelineItem.activitySeconds)

watchEffect(() => {
  if (props.timelineItem.hour !== now.value.getHours() && isRunning.value) {
    stop()
  }
})

watchEffect(() =>
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value,
  }),
)

onMounted(() => {
  if (props.timelineItem.isActive) {
    start()
  }
})

watch(isRunning, () => {
  updateTimelineItem(props.timelineItem, {
    isActive: Boolean(isRunning.value),
  })
})
</script>

<style scoped></style>
