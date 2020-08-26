import { defineConfig } from 'umi';
export default defineConfig({
  dva: {
    immer: true,
    hmr: false,
  },
  layout: {
    name: 'Test',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login',
      layout: false,
    },
    {
      path: '/NotFound',
      component: '@/pages/exception/notFound',
    },
    {
      path: '/',
      redirect: '/device/panel',
    },
    {
      path: '/device',
      name: 'device',
      routes: [
        {
          path: '/device/panel',
          name: 'panel',
          component: '@/pages/device',
        },
        {
          path: '/device/meter',
          name: 'meter',
          component: '@/pages/device',
        },
        {
          path: '/device/reader',
          name: 'reader',
          component: '@/pages/device',
        },
        {
          path: '/device/door',
          name: 'door',
          component: '@/pages/device',
        },
        {
          path: '*',
          redirect: '/NotFound',
        },
      ],
    },
    {
      path: '*',
      redirect: '/NotFound',
    },
  ],
});
