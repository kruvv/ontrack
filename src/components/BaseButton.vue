<template>
    <button :class="classes">
        <slot></slot>
    </button>
</template>

<script lang="ts">
import {
    BUTTON_TYPE_PRIMARY,
    BUTTON_TYPE_DANGER,
    BUTTON_TYPE_NEUTRAL,
    BUTTON_TYPE_SUCCESS,
    BUTTON_TYPE_WARNING,
} from '@/constants'

type TypeClasses = {
    [key: string]: string
}
const typeClasses: TypeClasses = {
    [BUTTON_TYPE_PRIMARY]: 'bg-purple-500 p-3 enabled:hover:bg-purple-600',
    [BUTTON_TYPE_NEUTRAL]: 'bg-gray-100 p-3 enabled:hover:bg-gray-200',
    [BUTTON_TYPE_DANGER]: 'bg-red-500 p-3 enabled:hover:bg-red-600 text-white',
    [BUTTON_TYPE_SUCCESS]: 'bg-green-500 p-3 enabled:hover:bg-green-600 text-white',
    [BUTTON_TYPE_WARNING]: 'bg-yellow-500 p-3 enabled:hover:bg-yellow-600 text-white',
}
</script>

<script setup lang="ts">
import { isButtonTypeValid } from '@/validators'

const props = defineProps({
    type: {
        type: String,
        default: BUTTON_TYPE_PRIMARY,
        validator: isButtonTypeValid,
    },
})

const classes = [
    'rounded  disabled:cursor-not-allowed disabled:opacity-50',
    typeClasses[props.type],
]
</script>

<style lang="scss" scoped></style>
