<template>
  <div class="mt-7">
    <ul>
      <TimelineItem v-for="timelineitem in timelineItems" :key="timelineitem.hour" :timeline-item="timelineitem" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue'

defineProps(['timelineItems'])
</script>

<style scoped></style>
