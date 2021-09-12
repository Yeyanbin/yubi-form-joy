
import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';

import { LogInOutline, HomeOutline, FolderOutline } from '@vicons/ionicons5';
import { renderIcon } from './common';
import handleGuard from './guard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '主页',
      icon: renderIcon(HomeOutline)
    },    
  },
  {
    path: '/schema',
    name: '表单',
    redirect: '/schema/op',
    component: () => import('@/views/schema/index.vue'),
    meta: {
      title: '表单页',
      icon: renderIcon(FolderOutline)
    },
    children: [
      {
        path: 'demo',
        name: '表单demo',
        component: () => import('@/views/schema/yubiFormDemo/index.vue'),
      },
      {
        path: 'op',
        name: '制作表单',
        component: () => import('@/views/schema/yubiFormOp/index.vue'),
      },
      {
        path: 'manager',
        name: '表单管理',
        component: () => import('@/views/schema/yubiFormManager/index.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页',
      icon: renderIcon(LogInOutline)
    },
  },
]




const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach(handleGuard);

export default router;
export {
  routes
};
