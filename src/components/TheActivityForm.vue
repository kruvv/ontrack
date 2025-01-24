<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input
      type="text"
      v-model="activity"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton :disabled="activity.trim() === '' || activity.trim().length < 2">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from '@/validators.ts'

const emit = defineEmits({
  submit: isActivityValid,
})

const activity = ref<string>('')

async function submit() {
  emit('submit', activity.value.trim())
  activity.value = ''

  // Прокрутка до новой активности
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<style scoped></style>
