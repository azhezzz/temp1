import { API } from '@/api';
import { RequestConfig } from 'umi';
import rightRender from '@/components/rightRender';

export const request: RequestConfig = {
  timeout: 15 * 1000,
  errorConfig: {
    adaptor: resData => {
      return {
        ...resData,
        success: resData.status === 0,
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
  logout: () => {
    console.log('???');
  }, // do something
  rightRender: rightRender, // return string || ReactNode;
  ErrorComponent: (error: any) => {
    console.log(error);
    return null;
  },
};
