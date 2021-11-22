import { createApp } from 'vue'
import App from './App.vue'
import { setupElementPlus, setupSvgIcon } from '@/plugins'
import router from './router'
import store from './store'
import './styles/index.scss'

const app = createApp(App)
setupElementPlus(app)
setupSvgIcon(app)

app.use(store).use(router).mount('#app')
