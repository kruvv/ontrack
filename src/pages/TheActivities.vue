<template>
  <div class="flex flex-col grow">
    <ul v-if="activities?.length > 0" class="divide-y grow">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>

<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue'
import { validateActivities, isActivityValid } from '@/validators.ts'
import type { PropType } from 'vue'

defineProps({
  activities: {
    type: Array as PropType<string[]>,
    requered: true,
    validator: validateActivities,
  },
})
const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
})
</script>

<style scoped></style>
