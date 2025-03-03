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
import { watchPostEffect, nextTick } from 'vue'
import TimelineItem from '@/components/TimelineItem.vue'
import { currentPage } from '@/router'
import { PAGE_TIMELINE } from '@/constants'
import { timelineItems, scrollToHour, timelineItemRefs } from '@/timeline-items'

watchPostEffect(async () => {
    if (currentPage.value === PAGE_TIMELINE) {
        await nextTick()
        scrollToHour(null, false)
    }
})
</script>

<style scoped></style>
