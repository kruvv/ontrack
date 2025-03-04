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
import { onActivated } from 'vue'
import TimelineItem from '@/components/TimelineItem.vue'
import {
    timelineItems,
    scrollToCurrentHour,
    timelineItemRefs,
    scrollToHour,
} from '@/timeline-items'

onActivated(scrollToCurrentHour)
</script>

<style scoped></style>
