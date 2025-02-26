<template>
    <a
        :href="`#${PAGE_TIMELINE}`"
        @click="navigate(PAGE_TIMELINE)"
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
import { navigate } from '@/router'
</script>

<style scoped></style>
