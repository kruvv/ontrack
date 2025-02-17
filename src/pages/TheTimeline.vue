<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions"
        :activities="activities"
        ref="timelineItemRefs"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
        @scroll-to-hour="scrollToHour"
        @update-activity-seconds="emit('updateTimelineItemActivitySeconds', timelineItem, $event)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, nextTick } from 'vue'
import TimelineItem from '@/components/TimelineItem.vue'
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
  isPageValid,
  isNumber,
} from '@/validators.ts'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants.ts'
import type { TimelineItemType } from '@/validators.ts'
import type { PropType } from 'vue'

const props = defineProps({
  timelineItems: {
    type: Array as PropType<TimelineItemType[]>,
    required: true,
    validator: validateTimelineItems,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
  activities: {
    type: Array,
    requered: true,
    validator: validateActivities,
  },
  currentPage: {
    type: String,
    requered: true,
    validator: isPageValid,
  },
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  },
  updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
    return [isTimelineItemValid(timelineItem), isNumber(activitySeconds)].every(Boolean)
  },
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false)
  }
})

function scrollToHour(hour: number = null, isSmooth: boolean = true) {
  hour ??= new Date().getHours()
  // опция для выбора плавной или обычной прокрутки прокрутки
  const options = { behavior: isSmooth ? 'smooth' : 'instant' }
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options)
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options)
  }
}
</script>

<style scoped></style>
