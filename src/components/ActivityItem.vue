<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity }}</span>
    </div>
    <div>
      <BaseSelect
        class="font-mono"
        :selected="secondsToComplete"
        placeholder="h:mm"
        :options="PERIOD_SELECT_OPTIONS"
        @select="secondsToComplete = $event"
      />
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/constants.ts'
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import { isActivityValid } from '@/validators.ts'

defineProps({
  activity: {
    type: String,
    requered: true,
    validator: isActivityValid,
  },
})

const secondsToComplete = ref<number>(null)
</script>

<style scoped></style>
