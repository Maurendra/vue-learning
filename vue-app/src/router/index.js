import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/login/Login.vue";
import CompanyDashboard from "../views/company-dashboard/CompanyDashboard.vue";
import VendorDashboard from "../views/vendor-dashboard/VendorDashboard.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: "/company-dashboard",
      name: "company-dashboard",
      component: CompanyDashboard,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/vendor-dashboard",
      name: "vendor-dashboard",
      component: VendorDashboard,
      meta: {
        requireAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!store.state.user) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    if (store.state.user) {
      next({
        path: "/company-dashboard",
      });
    } else {
      next();
    }
  }
});

export default router;
