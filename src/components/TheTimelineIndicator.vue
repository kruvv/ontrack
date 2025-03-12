<template>
    <hr
        ref="indicatorRef"
        class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
        :style="{ top: `${topOffset}px` }"
    />
</template>

<script setup lang="ts">
import { ref, computed, onActivated, onDeactivated } from 'vue'
import { HUNDRED_PERCENT } from '@/constants'
import { secondsSinceMidnightInPercentage, startTimer, stopTimer } from '@/time'

const indicatorRef = ref()

const topOffset = computed(
    () => (secondsSinceMidnightInPercentage.value * getTimelineHight()) / HUNDRED_PERCENT,
)

function getTimelineHight() {
    return indicatorRef.value?.parentNode.getBoundingClientRect().height
}

onActivated(startTimer)
onDeactivated(stopTimer)
</script>

<style scoped></style>
