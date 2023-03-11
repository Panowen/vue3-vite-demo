import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';

const app = createApp(App);
import '@/styles/index.scss'; // global css
import 'element-plus/dist/index.css';

import './permission';
app.use(ElementPlus);

app.use(createPinia());
app.use(router);

app.mount('#app');
