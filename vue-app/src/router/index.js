import { createRouter, createWebHistory } from "vue-router";
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
        type: "company",
      },
    },
    {
      path: "/vendor-dashboard",
      name: "vendor-dashboard",
      component: VendorDashboard,
      meta: {
        requireAuth: true,
        type: "vendor",
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
      if (store.state.user.role == "vendor" && to.meta.type == "company") {
        next({
          path: "/vendor-dashboard",
        });
      } else if (
        store.state.user.role == "company" &&
        to.meta.type == "vendor"
      ) {
        next({
          path: "/company-dashboard",
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
