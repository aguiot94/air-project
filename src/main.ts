import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'airProjectTheme',
    themes: {
      airProjectTheme: {
        dark: false,
        colors: {
          'lm-green': '#188803',
          'error': '#fc1c03',
        }
      }
    },
  },
})

const app = createApp(App)

app.use(vuetify);
app.use(createPinia())

app.mount('#app')
