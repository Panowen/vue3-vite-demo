import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'

/**
 * title：页面标题
 * elSvgIcon：页面icon
 * affix：是否默认挂在标签栏
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect.jsx')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: 'Dashboard', elSvgIcon: 'Fold', affix: true }
      }
    ]
  },
  {
    path: '/c',
    component: Layout,
    children: [
      {
        path: 'c',
        name: '404',
        component: () => import('@/views/AboutView.vue'),
        meta: { title: '404', elSvgIcon: 'Fold', affix: true }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/AboutView.vue'),
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/AboutView.vue'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/AboutView.vue'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/AboutView.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/AboutView.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/AboutView.vue'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/AboutView.vue'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router
