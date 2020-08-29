import { defineConfig } from 'umi';

export default defineConfig({
  dva: { immer: true, hmr: false },
  define: {
    BASE_URL: process.env.NODE_ENV?.includes('prod')
      ? process.env.PROD_BASE_URL
      : process.env.DEV_BASE_URL,
  },
  layout: {
    name: 'YMFARM',
    title: 'YMFARM',
    logo: '/public/logo.png',
    navTheme: 'light',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    pwa: false,
    splitMenus: false,
  },
  metas: [{ name: 'build_time', value: new Date() }],
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
      wrappers: ['@/wrappers/auth'],
    },
    {
      path: '/',
      redirect: '/device/panel',
    },
    {
      path: '/device',
      name: '设备信息',
      component: '@/wrappers',
      wrappers: ['@/wrappers/auth'],
      routes: [
        {
          path: '/device/panel',
          name: '控制面板',
          component: '@/pages/device',
        },
        { path: '/device/meter', name: '计量器', component: '@/pages/device' },
        { path: '/device/reader', name: '识别器', component: '@/pages/device' },
        {
          path: '/device/doorsensor',
          name: '门传感器',
          component: '@/pages/device',
        },
        { path: '*', redirect: '/NotFound' },
      ],
    },
    {
      path: '*',
      redirect: '/NotFound',
    },
  ],
});
