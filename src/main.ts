import { createApp } from 'vue'
import App from './App.vue'
import { setupElementPlus, setupSvgIcon } from '@/plugins'
import router from './router'
import store from './store'

// import vm from 'virtual-module'
// console.log(vm)

import './styles/index.scss' //引入通用样式

const app = createApp(App)
setupElementPlus(app)
setupSvgIcon(app)

app.use(store).use(router).mount('#app')
