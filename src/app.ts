import React from 'react';
import { RequestConfig, history, getDvaApp } from 'umi';
import { ConfigProvider } from 'antd';
import dotProp from 'dot-prop';
import zhCN from 'antd/es/locale/zh_CN';

import rightRender from '@/components/rightRender';
import { StorageKey } from '@/constants';

export const request: RequestConfig = {
  prefix: '/api',
  timeout: 15 * 1000,
  errorConfig: {
    adaptor: (resData, ctx) => {
      // console.log(resData, ctx);
      if (ctx?.res?.status === 401) {
        // 认证失败
        const message = dotProp.has(ctx?.req, 'options.headers.Authorization')
          ? '请重新登陆'
          : '请先登录';
        // globalThis?.localStorage?.clear();
        // globalThis?.sessionStorage?.clear();
        // history.push('/login');

        getDvaApp()?._store?.dispatch?.({
          type: `user/login`,
          payload: {
            values: { password: '123456', username: 'admin', remember: true },
          },
        });
        return {
          ...resData,
          success: true,
          showType: 1,
          errorMessage: message,
        };
      }
      return {
        ...resData,
        success: resData?.detail,
        errorMessage:
          typeof resData?.detail == 'string'
            ? resData?.detail
            : JSON.stringify(resData?.detail),
      };
    },
  },
  middlewares: [],
  requestInterceptors: [
    (url, options) => {
      const token =
        globalThis?.localStorage?.getItem(StorageKey.ACCESS_TOKEN) ||
        globalThis?.sessionStorage?.getItem(StorageKey.ACCESS_TOKEN);
      token && dotProp.set(options, 'headers.Authorization', token);
      return { url, options };
    },
  ],
  responseInterceptors: [],
};

export function getInitialState() {
  const token =
    globalThis?.localStorage?.getItem(StorageKey.ACCESS_TOKEN) ||
    globalThis?.sessionStorage?.getItem(StorageKey.ACCESS_TOKEN);
  if (!token) return {};
  return { isLogin: true };
}

export const layout = {
  rightRender: rightRender,
};

export function rootContainer(container: React.ReactNode) {
  return React.createElement(ConfigProvider, { locale: zhCN }, container);
}
