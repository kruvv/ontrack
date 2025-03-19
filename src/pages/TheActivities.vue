<template>
    <div class="flex flex-col grow">
        <ul
            v-if="activities?.length > 0"
            class="divide-y grow"
        >
            <ActivityItem
                v-for="activity in activities"
                :key="activity.id"
                :activity="activity"
            />
        </ul>
        <TheActivitiesEmptyState v-else />
        <TheActivityForm />
    </div>
</template>

<script setup lang="ts">
import ActivityItem from '@/components/ActivityItem.vue'
import TheActivityForm from '@/components/TheActivityForm.vue'
import TheActivitiesEmptyState from '@/components/TheActivitiesEmptyState.vue'
import { activities } from '@/activities'
</script>

<style scoped></style>
