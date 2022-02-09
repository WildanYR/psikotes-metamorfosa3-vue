import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import './index.css'

createApp(App).use(createPinia()).use(router).use(Notifications).mount('#app')
