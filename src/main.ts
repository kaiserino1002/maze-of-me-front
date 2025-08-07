import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import api from 'axios';

// await api.get('/sanctum/csrf-cookie');
createApp(App).use(router).mount('#app')