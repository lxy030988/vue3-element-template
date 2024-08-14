import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/theme/index.scss' //自定义element-plus主题
import 'virtual:svg-icons-register' //全局注册svg图标
import './styles/index.scss'

const app = createApp(App)

app.use(store).use(router).mount('#app')
