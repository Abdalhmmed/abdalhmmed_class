import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './styles/tokens.css'
import './styles/portal.css'
import './styles/lecture.css'

const app = createApp(App)

app.config.errorHandler = (err, _instance, info) => {
  if (typeof console !== 'undefined' && console.error) {
    console.error('[App Error]', info, err)
  }
}

app.use(createPinia())
app.use(router)

app.mount('#app')
