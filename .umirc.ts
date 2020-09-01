import { defineConfig } from 'umi';

export default defineConfig({
  dva: { immer: true, hmr: false },
  define: {
    BASE_URL: process.env.NODE_ENV?.includes('prod')
      ? process.env.PROD_BASE_URL
      : process.env.DEV_BASE_URL,
    APP_NAME: 'YMFarm',
  },

  metas: [{ name: 'build_time', value: new Date() }],
  nodeModulesTransform: { type: 'none' },
  routes: [
    {
      path: '/login',
      component: '@/pages/login',
    },
    {
      path: '/NotFound',
      component: '@/pages/exception/notFound',
      wrappers: ['@/layouts', '@/wrappers/auth'],
    },
    {
      path: '/',
      redirect: '/device/panel',
    },
    {
      path: '/device',
      component: '@/layouts',
      wrappers: ['@/wrappers/auth'],
      access: 'isLogin',
      routes: [
        { path: '/device/panel', component: '@/pages/device' },
        { path: '/device/meter', component: '@/pages/device' },
        { path: '/device/reader', component: '@/pages/device' },
        { path: '/device/doorsensor', component: '@/pages/device' },
        { path: '*', redirect: '/NotFound' },
      ],
    },
    {
      path: '*',
      redirect: '/NotFound',
    },
  ],
});
