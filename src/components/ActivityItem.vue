<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect class="font-mono grow" :selected="activity.secondsToComplete || null" placeholder="hh:mm"
        :options="periodSelectOptions" @select="setActivitySecondsToComplete(activity, $event)" />
      <ActivitySecondsToComplete v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { PropType } from 'vue'
import { BUTTON_TYPE_DANGER } from '@/constants.ts'
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import ActivitySecondsToComplete from '@/components/ActivitySecondsToComplete.vue'
import { isActivityValid } from '@/validators.ts'
import type { ActivityType } from '@/validators.ts'
import {
  deleteActivityKey,
  periodSelectOptionsKey,
  setActivitySecondsToCompleteKey,
} from '@/keys.ts'

defineProps({
  activity: {
    type: Object as PropType<ActivityType>,
    requered: true,
    validator: isActivityValid,
  },
})

const deleteActivity = inject(deleteActivityKey)
const periodSelectOptions = inject(periodSelectOptionsKey)
const setActivitySecondsToComplete = inject(setActivitySecondsToCompleteKey)
</script>

<style scoped></style>
