<template>
  <div>
    <ul class="divide-y">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import { validateActivities, isActivityValid } from '@/validators.ts'

defineProps({
  activities: {
    type: Array,
    requered: true,
    validator: validateActivities,
  },
})
const emit = defineEmits({
  deleteActivity: isActivityValid,
})
</script>

<style scoped></style>
