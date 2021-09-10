
import Layout from '@/layout/index.vue';
import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '主页',
        },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '登录',
        },
      }
    ],
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach

export default router;
export {
  routes
};
