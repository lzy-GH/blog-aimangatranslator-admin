import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import setupAnt from './ant-desgn-vue'

const app = createApp(App)
setupAnt(app)
// app.use(store);
app.use(router);
app.mount('#app');
