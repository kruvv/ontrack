<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheNav from '@/components/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities.vue'
import TheProgress from '@/pages/TheProgress.vue'
import { ref, computed, provide } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants.ts'
import {
  generateTimeLineItems,
  generateActivitySelectOptions,
  generateActivities,
  generatePeriodSelectOptions,
} from '@/functions.ts'
import { currentPage, timelineRef } from '@/router.ts'
import type { TimelineItemType, SelectOptionsType, ActivityType } from '@/validators.ts'

const activities = ref<ActivityType[]>(generateActivities())
const timelineItems = ref<TimelineItemType[]>(generateTimeLineItems(activities.value))
const activitySelectOptions = computed<SelectOptionsType[]>(() =>
  generateActivitySelectOptions(activities.value),
)

function deleteActivity(activity: ActivityType) {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity: ActivityType) {
  activities.value.push(activity)
}

function setTimelineItemActivity(timelineItem: TimelineItemType, activityId: string | null): void {
  timelineItem.activityId = activityId
}

function updateTimelineItemActivitySeconds(
  timelineItem: TimelineItemType,
  activitySeconds: number,
): void {
  timelineItem.activitySeconds += activitySeconds
}

function setActivitySecondsToComplete(activity: ActivityType, secondsToComplete: number): void {
  activity.secondsToComplete = secondsToComplete
}

provide('timelineItems', timelineItems.value)
provide('createActivity', createActivity)
provide('deleteActivity', deleteActivity)
provide('setActivitySecondsToComplete', setActivitySecondsToComplete)
provide('setTimelineItemActivity', setTimelineItemActivity)
provide('activitySelectOptions', activitySelectOptions.value)
provide('periodSelectOptions', generatePeriodSelectOptions())
provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
</script>

<template>
  <TheHeader />
  <main class="flex flex-grow flex-col">
    <TheTimeline v-show="currentPage === PAGE_TIMELINE" :timeline-items="timelineItems" :activities="activities"
      ref="timelineRef" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" :activities="activities" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav />
</template>
