import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'beercss'
import 'material-dynamic-colors'
import './style.css'
const app = createApp(App)
app.use(router)
app.mount('#app')
