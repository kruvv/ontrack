<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="navigate(PAGE_TIMELINE)">
    <img src="@/assets/img/logo.png" alt="Logo" class="h-9" />
  </a>
</template>

<script setup lang="ts">
import { PAGE_TIMELINE } from '@/constants.ts'
import { navigate } from '@/router.ts'
</script>

<style scoped></style>
