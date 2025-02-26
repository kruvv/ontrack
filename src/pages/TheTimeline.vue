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
import { currentPage } from '@/router'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
import type { TimelineItemType } from '@/validators'
import { currentHour } from '@/functions'
import { timelineItems } from '@/timeline-items'

defineExpose({ scrollToHour })

const timelineItemRefs = ref<TimelineItemType[]>([])

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
