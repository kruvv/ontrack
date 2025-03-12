<template>
    <li class="flex flex-col gap-1 p-4">
        <div class="truncate text-xl">{{ activity.name }}</div>
        <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
            <div
                :class="['transition-all', colorClass]"
                :style="{ width: `${Math.min(percentage, HUNDRED_PERCENT)}%` }"
            ></div>
        </div>
        <div class="flex justify-between font-mono text-sm">
            <span>{{ percentage }}%</span
            ><span
                >{{ formatSeconds(trackedActivitySeconds) }}
                /
                {{ formatSeconds(activity.secondsToComplete) }}</span
            >
        </div>
    </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { isActivityValid, type ActivityType } from '@/validators'
import { formatSeconds } from '@/functions'
import { useProgress } from '@/composables/progress'
import { HUNDRED_PERCENT } from '@/constants'

const props = defineProps({
    activity: {
        type: Object as PropType<ActivityType>,
        required: true,
        validator: isActivityValid,
    },
})

const { colorClass, percentage, trackedActivitySeconds } = useProgress(props.activity)
</script>

<style scoped></style>
