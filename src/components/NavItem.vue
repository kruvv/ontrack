<template>
  <li class="flex-1">
    <a :href="`#${navItem.page}`" :class="classes" @click="handleClick">
      <BaseIcon :name="navItem.icon" class="h-6 w-6" />
      {{ navItem.page }}
    </a>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { currentPage, navigate } from '@/router.ts'
import { isNavItemValid } from '@/validators.ts'
import BaseIcon from '@/components/BaseIcon.vue'
import { PAGE_TIMELINE } from '@/constants'
import { scrollToCurrentHour } from '@/timeline-items'

const props = defineProps({
  navItem: {
    type: Object,
    required: true,
    validator: isNavItemValid,
  },
})

const classes = computed(() => [
  'flex flex-col items-center p-2 capitalize',
  props.navItem.page === currentPage.value ? 'bg-gray-200' : 'hover:bg-gray-100',
])

function handleClick() {
  // eslint-disable-next-line
  currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page)
}
</script>

<style scoped></style>
