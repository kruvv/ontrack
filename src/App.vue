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
import type { TimelineItemType, SelectOptionsType } from '@/validators.ts'

const currentPage = ref(normalizePageHash())
const timelineItems: TimelineItemType[] = generateTimeLineItems()
const activities = ref<string[]>(['Coding', 'Riding', 'Training'])
const activitySelectOptions: SelectOptionsType[] = generateActivitySelectOptions(activities.value)

function goTo(page: string) {
  currentPage.value = page
}

function deleteActivity(activity: string) {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity: string) {
  activities.value.push(activity)
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
      @create-activity="createActivity"
    />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>
  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>

<style scoped></style>
