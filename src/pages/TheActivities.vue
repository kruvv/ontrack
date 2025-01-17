<template>
  <div>
    <ul class="divide-y">
      <ActivityItem v-for="activity in activities" :key="activity" :activity="activity" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import { validateActivities } from '@/validators.ts'

defineProps({
  activities: {
    type: Array,
    requered: true,
    validator: validateActivities,
  },
})
</script>

<style scoped></style>
