import '@/assets/main.css'

import { createApp } from 'vue'
import { syncState } from '@/storage'
import App from '@/App.vue'

syncState()

// Слушаем событие доступности вкладки Timeline
document.addEventListener('visibilitychange', () => {
  syncState(document.visibilityState === 'visible')
})

createApp(App).mount('#app')
