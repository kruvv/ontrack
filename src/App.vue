<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import TheNav from '@/components/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities.vue'
import TheProgress from '@/pages/TheProgress.vue'
import { ref } from 'vue'
import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from './constants.ts'
import {
  normalizePageHash,
  generateTimeLineItems,
  generateActivitySelectOptions,
} from '@/functions.ts'
import type { TimelineItem, SelectOptions } from '@/validators.ts'

const currentPage = ref(normalizePageHash())
const timelineItems: TimelineItem[] = generateTimeLineItems()
const activities: string[] = ref(['Coding', 'Riding', 'Training'])
const activitySelectOptions: SelectOptions[] = generateActivitySelectOptions(activities.value)

function goTo(page: string) {
  currentPage.value = page
}

function deleteActivity(activity: string) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}
</script>

<template>
  <TheHeader @navigate="goTo($event)" />
  <main class="flex flex-grow flex-col">
    <TheTimeline
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
    />
    <TheActivities
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @delete-activity="deleteActivity"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>

<style scoped></style>
