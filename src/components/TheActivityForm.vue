<template>
  <form @submit.prevent="submit" class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4">
    <input type="text" v-model="name" class="w-full rounded border px-4 text-xl" placeholder="Activity name" />
    <BaseButton :disabled="name.trim() === '' || name.trim().length < 2">
      <PlusIcon class="h-8" />
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import { SECONDS_IN_HOUR } from '@/constants.ts'
import { ref, nextTick } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from '@/validators.ts'
import { id } from '@/functions.ts'

const emit = defineEmits({
  submit: isActivityValid,
})

const name = ref<string>('')

async function submit() {
  emit('submit', {
    id: id(),
    name: name.value.trim(),
    secondsToComplete: 0 * SECONDS_IN_HOUR,
  })
  name.value = ''

  // Прокрутка до новой активности
  await nextTick()
  window.scrollTo(0, document.body.scrollHeight)
}
</script>

<style scoped></style>
