<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineitem in timelineItems"
        :key="timelineitem.hour"
        :timeline-item="timelineitem"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'
import { validateTimelineItems } from '@/validators.ts'

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
})
</script>

<style scoped></style>
