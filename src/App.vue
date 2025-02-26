<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheNav from '@/components/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities.vue'
import TheProgress from '@/pages/TheProgress.vue'
import { provide, readonly } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants'
import { generatePeriodSelectOptions } from '@/functions'
import { currentPage, timelineRef } from '@/router'
import {
    setActivitySecondsToComplete,
    activitySelectOptions,
    createActivity,
    deleteActivity,
} from '@/activities'
import {
    setTimelineItemActivity,
    updateTimelineItemActivitySeconds,
    resetTimelineItemActivities,
} from '@/timeline-items'
import * as keys from '@/keys'

provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, (activity) => {
    resetTimelineItemActivities(activity)
    deleteActivity(activity)
})
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
</script>

<template>
    <TheHeader />
    <main class="flex flex-grow flex-col">
        <TheTimeline
            v-show="currentPage === PAGE_TIMELINE"
            ref="timelineRef"
        />
        <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
        <TheProgress v-show="currentPage === PAGE_PROGRESS" />
    </main>
    <TheNav />
</template>
