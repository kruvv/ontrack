<template>
    <div class="relative mt-7">
        <TheTimelineIndicator />
        <ul>
            <TimelineItem
                v-for="timelineItem in timelineItems"
                :key="timelineItem.hour"
                :timeline-item="timelineItem"
                ref="timelineItemRefs"
            />
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated } from 'vue'
import TimelineItem from '@/components/TimelineItem.vue'
import TheTimelineIndicator from '@/components/TheTimelineIndicator.vue'
import { timelineItems, scrollToCurrentHour, timelineItemRefs } from '@/timeline-items'
import { startTimer, stopTimer } from '@/time'

onActivated(() => {
    scrollToCurrentHour()
    startTimer()
})

onDeactivated(stopTimer)
</script>

<style scoped></style>
