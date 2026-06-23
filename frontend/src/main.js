import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './main.css'
import { useAuth } from './composables/useAuth'

const app = createApp(App)


const auth = useAuth()
app.provide('auth', auth)

app.use(router)


app.mount('#app')
