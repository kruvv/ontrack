<template>
  <li class="flex-1">
    <a v-bind="$attrs" class="flex flex-col items-center p-2 capitalize">
      <slot></slot>
    </a>
  </li>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style scoped></style>
