import '@/assets/main.css'

import { createApp } from 'vue'
import { loadState, saveState } from '@/storage'
import App from '@/App.vue'
import { findActiveTimelineItem, startTimelineItemTimer } from './timeline-items'

loadState()

const activeTimelineItem = findActiveTimelineItem()

if (activeTimelineItem) {
  startTimelineItemTimer(activeTimelineItem)
}

// Слушаем событие доступности вкладки Timeline
document.addEventListener('visibilitychange', () => {
  // eslint-disable-next-line
  document.visibilityState === 'visible' ? loadState() : saveState()
})

createApp(App).mount('#app')
