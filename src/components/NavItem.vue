<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="navigate(navItem.page)">
      <component :is="navItem.icon" class="h-6 w-6" /> {{ navItem.page }}
    </a>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { currentPage, navigate } from '@/router.ts'
import { isNavItemValid } from '@/validators.ts'

const props = defineProps({
  navItem: {
    type: Object,
    required: true,
    validator: isNavItemValid,
  },
})

const classes = computed(() => [
  'flex flex-col items-center p-2 capitalize',
  { 'bg-gray-200 pointer-events-none': props.navItem.page === currentPage.value },
])
</script>

<style scoped></style>
