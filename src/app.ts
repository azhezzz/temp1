import { API } from '@/api';
import { RequestConfig } from 'umi';
import rightRender from '@/components/rightRender';
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export const request: RequestConfig = {
  timeout: 15 * 1000,
  errorConfig: {
    adaptor: resData => {
      return {
        ...resData,
        success: resData?.status === 0,
        errorMessage: resData.message,
      };
    },
  },
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
};

export async function getInitialState() {
  try {
    const token =
      globalThis?.localStorage?.getItem('t') ||
      globalThis?.sessionStorage?.getItem('t');
    if (!token) return {};
    return await API.verify(token);
  } catch (error) {
    return {};
  }
}

export const layout = {
  rightRender: rightRender,
};

export function rootContainer(container: React.ReactNode) {
  return React.createElement(ConfigProvider, { locale: zhCN }, container);
}
