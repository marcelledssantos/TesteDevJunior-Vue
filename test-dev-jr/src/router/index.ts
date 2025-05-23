import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import SubestacoesView from "@/views/SubestacoesView.vue";
import InclusaoView from '@/views/InclusaoView.vue';
import MapaView from '@/views/MapaView.vue';

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: '/inclusao',
    name: 'inclusao',
    component: InclusaoView
  },
  {
    path: "/subestacoes",
    name: "subestacoes",
    component: SubestacoesView,
  },
  {
    path: '/mapa',
    component: MapaView,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
