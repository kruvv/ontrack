<template>
    <component
        :is="ICONS[name]"
        :class="$attrs.class || 'h-8'"
    />
</template>

<script setup lang="ts">
import { ICONS } from '@/icons'
import { isIconValid } from '@/validators'

defineProps({
    name: {
        required: true,
        type: String,
        validator: isIconValid,
    },
})
</script>

<style scoped></style>
