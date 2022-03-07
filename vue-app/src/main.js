import { createApp } from "vue";
import { createPinia } from "pinia";

import "./index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(store);
app.component("Datepicker", Datepicker);

app.mount("#app");
