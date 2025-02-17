<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheNav from '@/components/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities.vue'
import TheProgress from '@/pages/TheProgress.vue'
import { ref, computed } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants.ts'
import {
  normalizePageHash,
  generateTimeLineItems,
  generateActivitySelectOptions,
  generateActivities,
} from '@/functions.ts'
import type { TimelineItemType, SelectOptionsType, ActivityType } from '@/validators.ts'

const currentPage = ref(normalizePageHash())
const activities = ref<ActivityType[]>(generateActivities())
const timelineItems: TimelineItemType[] = ref(generateTimeLineItems(activities.value))
const timeline = ref()
const activitySelectOptions: SelectOptionsType[] = computed(() =>
  generateActivitySelectOptions(activities.value),
)

function goTo(page: string) {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour()
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }
  currentPage.value = page
}

function deleteActivity(activity: string) {
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

function setTimelineItemActivity(timelineItem, activity) {
  timelineItem.activityId = activity.id
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}
</script>

<template>
  <TheHeader @navigate="goTo($event)" />
  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
      :current-page="currentPage"
      :activities="activities"
      @set-timeline-item-activity="setTimelineItemActivity"
      ref="timeline"
      @update-timeline-item-activity-seconds="updateTimelineItemActivitySeconds"
    />
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivity"
      @create-activity="createActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete"
      :timeline-items="timelineItems"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>

<style scoped></style>
