import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/components/layout/AppShell.vue"),
      children: [
        {
          path: "",
          redirect: "/dashboard",
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
        },
        {
          path: "shop",
          name: "shop",
          component: () => import("@/views/ShopView.vue"),
        },
        {
          path: "invoices",
          name: "invoices",
          component: () => import("@/views/InvoicesView.vue"),
        },
        {
          path: "receipts",
          name: "receipts",
          component: () => import("@/views/ReceiptsView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/components/layout/AdminLayout.vue"),
      meta: { requiresRole: "admin" },
      children: [
        {
          path: "",
          name: "admin",
          component: () => import("@/views/AdminView.vue"),
          meta: { requiresRole: "admin" },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      meta: { public: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
      meta: { public: true },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("@/views/ForgotPasswordView.vue"),
      meta: { public: true },
    },
    {
      path: "/verify-otp",
      name: "verify-otp",
      component: () => import("@/views/VerifyOtpView.vue"),
      meta: { public: true },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: () => import("@/views/ResetPasswordView.vue"),
      meta: { public: true },
    },
    {
      path: "/purchase/success",
      name: "purchase-success",
      component: () => import("@/views/PurchaseSuccessView.vue"),
      meta: { public: true },
    },
    {
      path: "/purchase/cancel",
      name: "purchase-cancel",
      component: () => import("@/views/PurchaseCancelView.vue"),
      meta: { public: true },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/dashboard",
    },
  ],
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.public) {
    if (auth.isAuthenticated && (to.name === "login" || to.name === "register")) {
      return auth.role === "admin" ? { name: "admin" } : { name: "dashboard" };
    }

    return true;
  }

  if (!auth.isAuthenticated) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }

  if (to.meta.requiresRole === "admin" && auth.role !== "admin") {
    return { name: "dashboard" };
  }

  if (
    auth.role === "admin" &&
    to.name !== "admin" &&
    to.path !== "/purchase/success" &&
    to.path !== "/purchase/cancel"
  ) {
    return { name: "admin" };
  }

  return true;
});

export default router;
