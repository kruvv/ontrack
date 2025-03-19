<template>
    <form
        @submit.prevent="submit"
        class="sticky bottom-[57px] flex gap-2 border-t bg-white p-4"
    >
        <input
            type="text"
            v-model="name"
            class="w-full rounded border px-4 text-xl"
            placeholder="Activity name"
        />
        <BaseButton :disabled="name.trim() === '' || name.trim().length < 2">
            <BaseIcon :name="ICON_PLUS" />
        </BaseButton>
    </form>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { id } from '@/functions'
import { createActivity } from '@/activities'
import { ICON_PLUS } from '@/icons'

const name = ref<string>('')

async function submit() {
    createActivity({
        id: id(),
        name: name.value.trim(),
        secondsToComplete: 0,
    })

    name.value = ''

    // Прокрутка до новой активности
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
}
</script>

<style scoped></style>
