// Import necessary libraries and components
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';
import App from './App.vue';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// Initialize the app instance
const app = createApp(App);

// Use plugins and libraries with the app instance
app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);

// Mount the app to the DOM
app.mount('#app');
