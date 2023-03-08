import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import redirect from './redirect'

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
        meta: { title: '首页', elSvgIcon: 'Fold', affix: true }
      }
    ]
  },
  {
    path: '/preject',
    component: Layout,
    name: 'Preject',
    redirect: '/preject/list',
    meta: {
      title: 'A管理',
      elSvgIcon: 'Fold'
    },
    children: [
      {
        path: 'list',
        name: 'PrejectList',
        component: () => import('@/views/home.vue'),
        meta: { title: 'A管理', elSvgIcon: 'Fold' }
      },
      {
        hidden: true,
        path: 'add',
        name: 'PrejectAdd',
        component: () => import('@/views/home.vue'),
        meta: { title: 'A新增' }
      }
    ]
  },
  {
    path: '/experiment',
    component: Layout,
    name: 'Experiment',
    redirect: '/experiment/list',
    meta: {
      title: 'B管理',
      elSvgIcon: 'Fold'
    },
    children: [
      {
        path: 'list',
        name: 'ExperimentList',
        component: () => import('@/views/home.vue'),
        meta: { title: 'B管理', elSvgIcon: 'Fold' }
      },
      {
        hidden: true,
        path: 'add',
        name: 'ExperimentAdd',
        component: () => import('@/views/home.vue'),
        meta: { title: 'B新增' }
      }
    ]
  },
  {
    path: '/template',
    component: Layout,
    name: 'Template',
    redirect: '/template/list',
    meta: {
      title: 'C管理',
      elSvgIcon: 'Fold'
    },
    children: [
      {
        path: 'list',
        name: 'TemplateList',
        component: () => import('@/views/home.vue'),
        meta: { title: 'C管理', elSvgIcon: 'Fold' }
      },
      {
        hidden: true,
        path: 'add',
        name: 'TemplateAdd',
        component: () => import('@/views/home.vue'),
        meta: { title: 'C新增' }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
