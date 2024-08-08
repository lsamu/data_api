import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes:any = [
  {
    path: "/",
    component: () => import("../views/index.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),//createWebHistory(),
  routes,
});

export default router;
