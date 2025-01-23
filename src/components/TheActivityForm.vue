<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      :value="activity"
      @input="activity = $event.target.value"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton>
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from '@/validators.ts'

const emit = defineEmits({
  submit: isActivityValid,
})

let activity = ''

function submit() {
  emit('submit', activity)
  activity = ''
}
</script>

<style scoped></style>
