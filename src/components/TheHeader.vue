<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo @click="emit('navigate', PAGE_TIMELINE)" />
    <TheHeaderProgress @click="emit('navigate', PAGE_PROGRESS)" />
  </header>
</template>

<script setup lang="ts">
import TheLogo from './TheLogo.vue'
import TheHeaderProgress from './TheHeaderProgress.vue'
import { isPageValid } from '@/validators.ts'
import { PAGE_TIMELINE, PAGE_PROGRESS } from '@/constants.ts'

const emit = defineEmits({
  navigate: isPageValid,
})
</script>

<style scoped></style>
