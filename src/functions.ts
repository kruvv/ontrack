import {
    SECONDS_IN_MINUTE,
    MINUTES_IN_HOUR,
    MILLISECONDS_IN_SECOND,
    LOW_PERCENT,
    MEDIUM_PERCENT,
    HUNDRED_PERCENT,
} from '@/constants'
import { isNull } from '@/validators'

export function normalizeSelectValue(value: number | string | null) {
    return isNull(value) || isNaN(Number(value)) ? value : +value
}

// Генерация случайного id
export function id() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

function generatePeriodSelectOptionsLabel(periodsInMinutes: number) {
    const hours = Math.floor(periodsInMinutes / MINUTES_IN_HOUR)
        .toString()
        .padStart(2, '0')
    const minutes = (periodsInMinutes % MINUTES_IN_HOUR).toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

export function generatePeriodSelectOptions() {
    const periodsInMinutes = [
        15, 30, 45, 60, 90, 120, 150, 180, 210, 180, 240, 270, 300, 330, 360, 390, 420, 450, 480,
    ]
    return periodsInMinutes.map((periodsInMinutes) => ({
        value: periodsInMinutes * SECONDS_IN_MINUTE,
        label: generatePeriodSelectOptionsLabel(periodsInMinutes),
    }))
}

export function formatSecondsWithSign(seconds: number) {
    return `${seconds >= 0 ? '+' : '-'}${formatSeconds(seconds)}`
}

export function formatSeconds(seconds: number) {
    const date = new Date()
    date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND)
    const utc = date.toUTCString()
    return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6)
}

export function getProgressColorClass(precentage: number) {
    if (precentage < LOW_PERCENT) return 'bg-red-500'
    if (precentage < MEDIUM_PERCENT) return 'bg-yellow-500'
    if (precentage < HUNDRED_PERCENT) return 'bg-blue-500'
    return 'bg-green-500'
}
