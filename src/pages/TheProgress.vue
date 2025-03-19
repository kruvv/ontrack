<template>
    <ul
        v-if="trackedActivities.length > 0"
        class="divide-y"
    >
        <ProgressItem
            v-for="activity in trackedActivities"
            :key="activity.id"
            :activity="activity"
        />
    </ul>
    <TheProgressEmptyState v-else />
</template>

<script setup lang="ts">
import { trackedActivities } from '@/activities'
import ProgressItem from '@/components/ProgressItem.vue'
import TheProgressEmptyState from '@/components/TheProgressEmptyState.vue'
</script>

<style scoped></style>
