import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).use(Notifications).mount('#app')
