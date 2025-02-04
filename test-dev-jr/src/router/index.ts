import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import SubestacoesView from "@/views/SubestacoesView.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/subestacoes",
    name: "subestacoes",
    component: SubestacoesView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
