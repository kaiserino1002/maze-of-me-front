import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from '@/App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './style.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#9c88ff',
          secondary: '#fbc531',
          background: '#f5f6fa',
        },
      },
    },
  },
})

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(vuetify)
app.mount('#app')
