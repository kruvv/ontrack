<template>
  <h1>
    <ul class="divide-y">
      <ProgressItem v-for="(activity, index) in trackedActivities" :key="activity.id" :index="index"
        :activity="activity" />
    </ul>
  </h1>
</template>

<script setup lang="ts">
import { trackedActivities } from '@/activities'
import ProgressItem from '@/components/ProgressItem.vue'
</script>

<style scoped></style>
