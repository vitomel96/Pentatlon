import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/tailwind.css';
import router from './Router';

const app = createApp(App);

app.use(router);
app.mount('#app');