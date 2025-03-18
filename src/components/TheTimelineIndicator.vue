<template>
    <hr
        ref="indicatorRef"
        class="pointer-events-none absolute z-10 w-full border-b-2 border-red-600"
        :style="{ top: `${topOffset}px` }"
    />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { HUNDRED_PERCENT } from '@/constants'
import { secondsSinceMidnightInPercentage } from '@/time'

const indicatorRef = ref()

const topOffset = computed(
    () => (secondsSinceMidnightInPercentage.value * getTimelineHight()) / HUNDRED_PERCENT,
)

function getTimelineHight() {
    return indicatorRef.value?.parentNode.getBoundingClientRect().height
}
</script>

<style scoped></style>
