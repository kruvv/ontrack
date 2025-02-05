<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete', null)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div>
      <BaseSelect class="font-mono" :selected="activity.secondsToComplete || null" placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS" @select="emit('setSecondsToComplete', $event || 0)" />
    </div>
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/constants.ts'
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import { isActivityValid, isUndefined, /*isNull,*/ isNumber } from '@/validators.ts'
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
</script>

<style scoped></style>
