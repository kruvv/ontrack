<template>
    <component
        :is="ICONS[name]"
        :class="classes"
    />
</template>

<script setup lang="ts">
import { ICONS } from '@/icons'
import { isIconValid, isNotEmptyString } from '@/validators'

defineProps({
    name: {
        required: true,
        type: String,
        validator: isIconValid,
    },
    classes: {
        type: String,
        required: false,
        default: 'h-8',
        validator: isNotEmptyString,
    },
})
</script>

<style scoped></style>
