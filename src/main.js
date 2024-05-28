import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap/dist/js/bootstrap.bundle.js'
import router from './components/router'

createApp(App).use(router).mount('#app')
