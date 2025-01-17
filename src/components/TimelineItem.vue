<template>
  <li class="relative flex flex-col gap-2 border-t border-grey-200 py-10 px-4">
    <a href="#" :class="hourLinkClasses">{{ timelineItem.hour }}:00</a>
    <BaseSelect
      :selected="selectedActivityId"
      :options="options"
      placeholder="Rest"
      @select="selectedActivityId = $event"
    />
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseSelect from '@/components/BaseSelect.vue'
import { isTimelineItemValid } from '@/validators.ts'
const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

const hourLinkClasses = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded  px-2 font-mono text-lg',
  props.timelineItem.hour === new Date().getHours()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500',
]

type TypeOptions = {
  value: number
  label: string
}

const options: TypeOptions[] = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' },
]
const selectedActivityId = ref()
</script>

<style scoped></style>
