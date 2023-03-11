import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/components/layout/index.vue';
import redirect from './redirect';

/**
 * title：页面标题
 * elSvgIcon：页面icon
 * affix：是否默认挂在标签栏
 */
export const constantRoutes = [
  redirect,
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/home.vue'),
        meta: { title: '首页', elSvgIcon: 'Fold', affix: true },
      },
    ],
  },
  {
    path: '/preject',
    component: Layout,
    name: 'Preject',
    redirect: '/preject/list',
    meta: {
      title: '项目管理',
      elSvgIcon: 'Fold',
    },
    children: [
      {
        path: 'list',
        name: 'PrejectList',
        component: () => import('@/views/preject/index.vue'),
        meta: { title: '项目管理', elSvgIcon: 'Fold' },
      },
      {
        hidden: true,
        path: 'add',
        name: 'PrejectAdd',
        component: () => import('@/views/preject/prejectAdd.vue'),
        meta: { title: '项目新增' },
      },
    ],
  },
  {
    path: '/experiment',
    component: Layout,
    name: 'Experiment',
    redirect: '/experiment/list',
    meta: {
      title: '实验管理',
      elSvgIcon: 'Fold',
    },
    children: [
      {
        path: 'list',
        name: 'ExperimentList',
        component: () => import('@/views/experiment/index.vue'),
        meta: { title: '实验管理', elSvgIcon: 'Fold' },
      },
      {
        hidden: true,
        path: 'add',
        name: 'ExperimentAdd',
        component: () => import('@/views/experiment/experimentAdd.vue'),
        meta: { title: '项目新增' },
      },
    ],
  },
  {
    path: '/template',
    component: Layout,
    name: 'Template',
    redirect: '/template/list',
    meta: {
      title: '实验模板管理',
      elSvgIcon: 'Fold',
    },
    children: [
      {
        path: 'list',
        name: 'TemplateList',
        component: () => import('@/views/template/index.vue'),
        meta: { title: '实验模板管理', elSvgIcon: 'Fold' },
      },
      {
        hidden: true,
        path: 'add',
        name: 'TemplateAdd',
        component: () => import('@/views/template/templateAdd.vue'),
        meta: { title: '模板新增' },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
});

export default router;
