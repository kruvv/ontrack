<template>
    <li class="flex flex-col gap-2 p-4">
        <div class="flex items-center gap-2">
            <BaseButton
                :type="BUTTON_TYPE_DANGER"
                @click="deleteAndResetActivity(activity)"
            >
                <BaseIcon :name="ICON_TRASH" />
            </BaseButton>
            <span class="truncate text-xl">{{ activity.name }}</span>
        </div>
        <div class="flex gap-2">
            <BaseSelect
                class="font-mono grow"
                :selected="activity.secondsToComplete || null"
                placeholder="hh:mm"
                :options="PERIOD_SELECT_OPTIONS"
                @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
            />
            <RemainingActivitySeconds
                v-if="activity.secondsToComplete"
                :activity="activity"
            />
        </div>
    </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '@/constants'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseButton from '@/components/BaseButton.vue'
import RemainingActivitySeconds from '@/components/RemainingActivitySeconds.vue'
import { isActivityValid } from '@/validators'
import type { ActivityType } from '@/validators'
import { deleteActivity, updateActivity } from '@/activities'
import { timelineItems, resetTimelineItemActivities } from '@/timeline-items'
import { ICON_TRASH } from '@/icons'

defineProps({
    activity: {
        type: Object as PropType<ActivityType>,
        requered: true,
        validator: isActivityValid,
    },
})

function deleteAndResetActivity(activity) {
    resetTimelineItemActivities(timelineItems.value, activity)
    deleteActivity(activity)
}
</script>

<style scoped></style>
