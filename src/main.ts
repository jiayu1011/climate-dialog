import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from "@/router/router";
import vant from 'vant'
import 'vant/lib/index.css';

const app = createApp(App)

app.use(router)
app.use(vant)

app.mount('#app')
