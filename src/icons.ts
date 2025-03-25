import {
    ClockIcon as Clock,
    ListBulletIcon as ListBullet,
    ChartBarIcon as ChartBar,
    TrashIcon as Trash,
    ArrowPathIcon as ArrowPath,
    PauseIcon as Pause,
    PlayIcon as Play,
    XMarkIcon as XMark,
    PlusIcon as Plus,
    CheckCircleIcon as CheckCircle,
} from '@heroicons/vue/24/outline'

export const ICON_CLOCK = 'Clock'
export const ICON_LIST_BULLET = 'ListBullet'
export const ICON_CHART_BAR = 'ChartBar'
export const ICON_TRASH = 'Trash'
export const ICON_ARROW_PATH = 'ArrowPath'
export const ICON_PAUSE = 'Pause'
export const ICON_PLAY = 'Play'
export const ICON_X_MARK = 'XMark'
export const ICON_PLUS = 'Plus'
export const ICON_CHECK_CIRCLE = 'CheckCircle'

type IconType =
    | typeof Clock
    | typeof ListBullet
    | typeof ChartBar
    | typeof Trash
    | typeof ArrowPath
    | typeof Pause
    | typeof Play
    | typeof XMark
    | typeof Plus
    | typeof CheckCircle

type Icons = {
    [key: string]: IconType
}
export const ICONS: Icons = {
    [ICON_CLOCK]: Clock,
    [ICON_LIST_BULLET]: ListBullet,
    [ICON_CHART_BAR]: ChartBar,
    [ICON_TRASH]: Trash,
    [ICON_ARROW_PATH]: ArrowPath,
    [ICON_PAUSE]: Pause,
    [ICON_PLAY]: Play,
    [ICON_X_MARK]: XMark,
    [ICON_PLUS]: Plus,
    [ICON_CHECK_CIRCLE]: CheckCircle,
}
