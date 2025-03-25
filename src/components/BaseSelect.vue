<template>
    <div class="flex gap-2">
        <BaseButton
            :type="BUTTON_TYPE_NEUTRAL"
            @click="select(null)"
        >
            <BaseIcon :name="ICON_X_MARK" />
        </BaseButton>
        <select
            class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl"
            @change="select(($event.target as HTMLInputElement).value)"
        >
            <option
                :selected="isNotSelected"
                disabled
                value=""
            >
                {{ placeholder }}
            </option>
            <option
                v-for="{ value, label } in options"
                :key="value"
                :value="value"
                :selected="value === selected"
            >
                {{ label }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { validateSelectOptions, isUndefinedOrNull, isSelectValueValid } from '@/validators'
import type { SelectOptionsType } from '@/validators'
import { normalizeSelectValue } from '@/functions'
import { BUTTON_TYPE_NEUTRAL } from '@/constants'
import { ICON_X_MARK } from '@/icons'

const emit = defineEmits({
    select: isSelectValueValid,
})

const props = defineProps({
    selected: [String, Number] /* as PropType<SelectType>*/,
    options: {
        type: Array as PropType<SelectOptionsType[]>,
        required: true,
        validator: validateSelectOptions,
    },
    placeholder: { type: String, required: true },
})

const isNotSelected = computed(() => {
    debugger
    return isUndefinedOrNull(props.selected)
})

function select(value: number | string | null) {
    emit('select', normalizeSelectValue(value))
}
</script>

<style scoped></style>
