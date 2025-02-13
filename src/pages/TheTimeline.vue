<template>
  <div class="mt-7">
    <ul>
      <TimelineItem v-for="timelineItem in timelineItems" :key="timelineItem.hour" :timeline-item="timelineItem"
        :activity-select-options="activitySelectOptions" :activities="activities" ref="timelineItemRefs"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TimelineItem from '@/components/TimelineItem.vue'
import {
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
  isTimelineItemValid,
  isActivityValid,
} from '@/validators.ts'
import { MIDNIGHT_HOUR } from '@/constants.ts'
import type { TimelineItemType } from '@/validators.ts'
import type { PropType } from 'vue'

defineProps({
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
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  },
})

const timelineItemRefs = ref([])

onMounted(scrollToCurrentTimelineItem)

function scrollToCurrentTimelineItem() {
  const currentHour = new Date().getHours()
  if (currentHour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView()
  } else {
    timelineItemRefs.value[currentHour - 1].$el.scrollIntoView()
  }
}
</script>

<style scoped></style>
