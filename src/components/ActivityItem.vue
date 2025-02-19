<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete', null)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect class="font-mono grow" :selected="activity.secondsToComplete || null" placeholder="hh:mm"
        :options="periodSelectOptions" @select="emit('setSecondsToComplete', $event || 0)" />
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
import { isActivityValid, isUndefined, isNumber } from '@/validators.ts'
import type { ActivityType } from '@/validators.ts'

defineProps({
  activity: {
    type: Object as PropType<ActivityType>,
    requered: true,
    validator: isActivityValid,
  },
})

const emit = defineEmits({
  delete: /*isNull,*/ isUndefined,
  setSecondsToComplete: isNumber,
})

const periodSelectOptions = inject('periodSelectOptions')
</script>

<style scoped></style>
