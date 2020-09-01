import React from 'react';
import { RequestConfig, getDvaApp } from 'umi';
import { ConfigProvider } from 'antd';
import dotProp from 'dot-prop';
import zhCN from 'antd/es/locale/zh_CN';

import { StorageKey } from '@/constants';
import { Context } from 'umi-request';

const getErrMsg = (resData: any, ctx: Context) => {
  const errMsg = resData?.detail
    ? typeof resData?.detail == 'string'
      ? resData?.detail
      : JSON.stringify(resData?.detail)
    : ctx.res.statusText || '未知错误';
  return errMsg;
};
export const request: RequestConfig = {
  // @ts-ignore
  prefix: BASE_URL,
  timeout: 15 * 1000,
  errorConfig: {
    adaptor: (resData, ctx) => {
      if (ctx?.res?.status === 401) {
        // 认证失败
        const message = dotProp.has(ctx?.req, 'options.headers.Authorization')
          ? '请重新登陆'
          : '请先登录';

        // TODO: 测试用 待删除
        getDvaApp()?._store?.dispatch?.({
          type: `user/login`,
          payload: {
            values: { password: '123456', username: 'admin', remember: true },
          },
        });
        // TODO: 返回登陆页
        // globalThis?.localStorage?.clear();
        // globalThis?.sessionStorage?.clear();
        // history.push('/login');
        return {
          ...resData,
          success: true,
          showType: 1,
          errorMessage: message,
        };
      }
      const errMsg = getErrMsg(resData, ctx);
      return {
        ...resData,
        success: resData?.detail,
        errorMessage: errMsg,
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

// export const layout = { rightRender: rightRender };

export function rootContainer(container: React.ReactNode) {
  return React.createElement(ConfigProvider, { locale: zhCN }, container);
}
