<template>
    <a
        :href="`#${PAGE_TIMELINE}`"
        @click="handleClick(PAGE_TIMELINE)"
    >
        <img
            src="@/assets/img/logo.png"
            alt="Logo"
            class="h-9"
        />
    </a>
</template>

<script setup lang="ts">
import { PAGE_TIMELINE } from '@/constants'
import { currentPage, navigate } from '@/router'
import { scrollToCurrentHour } from '@/timeline-items'

function handleClick() {
    // eslint-disable-next-line
    currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_TIMELINE)
}
</script>

<style scoped></style>
