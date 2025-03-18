<template>
    <div class="flex w-full gap-2">
        <BaseButton
            :type="BUTTON_TYPE_DANGER"
            :disabled="!timelineItem.activitySeconds"
            @click="resetTimelineItemTimer(timelineItem)"
        >
            <BaseIcon :name="ICON_ARROW_PATH" />
        </BaseButton>
        <div class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl">
            {{ formatSeconds(timelineItem.activitySeconds) }}
        </div>
        <BaseButton
            v-if="timelineItem === activeTimelineItem"
            :type="BUTTON_TYPE_WARNING"
            @click="stopTimelineItemTimer"
        >
            <BaseIcon :name="ICON_PAUSE" />
        </BaseButton>
        <BaseButton
            v-else
            :type="BUTTON_TYPE_SUCCESS"
            :disabled="timelineItem.hour !== now.getHours()"
            @click="startTimelineItemTimer(timelineItem)"
        >
            <BaseIcon :name="ICON_PLAY" />
        </BaseButton>
    </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_WARNING, BUTTON_TYPE_SUCCESS } from '@/constants'
import { isTimelineItemValid, type TimelineItemType } from '@/validators'
import { formatSeconds } from '@/functions'
import { ICON_PLAY, ICON_PAUSE, ICON_ARROW_PATH } from '@/icons'
import { activeTimelineItem } from '@/timeline-items'
import {
    startTimelineItemTimer,
    stopTimelineItemTimer,
    resetTimelineItemTimer,
} from '@/timeline-item-timer'
import { now } from '@/time'

defineProps({
    timelineItem: {
        required: true,
        type: Object as PropType<TimelineItemType>,
        validator: isTimelineItemValid,
    },
})
</script>

<style scoped></style>
