import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/login/Login.vue";
import CompanyDashboard from "../views/company-dashboard/CompanyDashboard.vue";
import VendorDashboard from "../views/vendor-dashboard/VendorDashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/company-dashboard",
      name: "company-dashboard",
      component: CompanyDashboard,
    },
    {
      path: "/company-dashboard",
      name: "company-dashboard",
      component: VendorDashboard,
    },
  ],
});

export default router;
