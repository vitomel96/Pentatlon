import { createRouter, createWebHistory } from 'vue-router';
import HeroList from './app/UI/components/HeroList.vue';
import Simulator from './app/UI/components/Simulator.vue';

const routes = [
  {
    path: '/',
    name: 'HeroList',
    component: HeroList,
  },
  {
    path: '/simulator',
    name: 'Simulator',
    component: Simulator,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
