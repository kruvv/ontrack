<template>
  <li class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      :selected="selectedActivityId"
      :options="activitySelectOptions"
      placeholder="Rest"
      @select="selectedActivityId = $event"
    />
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import TimelineHour from '@/components/TimelineHour.vue'
import { isTimelineItemValid, validateSelectOptions } from '@/validators.ts'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
})

const selectedActivityId = ref(0)
</script>

<style scoped></style>
