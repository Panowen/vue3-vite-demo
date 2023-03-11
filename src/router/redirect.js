import Layout from '@/components/layout/index.vue';

export default {
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect.jsx'),
    },
  ],
};
