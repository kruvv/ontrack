<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="flex items-center justify-arround border-t">
      <NavItem v-for="navItem in NAV_ITEMS" :key="navItem.page" :nav-item="navItem" />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import NavItem from './NavItem.vue'
import { NAV_ITEMS } from '@/constants.ts'
</script>

<style scoped></style>
