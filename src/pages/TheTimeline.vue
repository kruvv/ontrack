<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, nextTick } from 'vue'
import TimelineItem from '@/components/TimelineItem.vue'
import { validateTimelineItems } from '@/validators.ts'
import { currentPage } from '@/router.ts'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants.ts'
import type { TimelineItemType } from '@/validators.ts'
import type { PropType } from 'vue'
import { currentHour } from '@/functions.ts'

defineProps({
  timelineItems: {
    type: Array as PropType<TimelineItemType[]>,
    required: true,
    validator: validateTimelineItems,
  },
})

defineExpose({ scrollToHour })

const timelineItemRefs = ref([])

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()
    scrollToHour(null, false)
  }
})

function scrollToHour(hour: number | null = null, isSmooth: boolean = true) {
  hour ??= currentHour()
  // опция для выбора плавной или обычной прокрутки прокрутки
  const el = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el
  el.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'instant' })
}
</script>

<style scoped></style>
