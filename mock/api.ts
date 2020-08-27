import mockjs from 'mockjs';

export default {
  // 使用 mockjs 等三方库
  'GET /api/device': mockjs.mock({
    'data|100': [
      { name: '@city', 'value|1-100': 50, 'type|0-2': 1, 'key|+1': 0 },
    ],
    status: 0,
  }),
};
