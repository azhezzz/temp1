import { request } from 'umi';

const delay = (duration: number) => {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, duration);
  });
};

export const API = {
  login: (data: any) =>
    request('http://webesports.fishiny.com/api/simple/login', {
      method: 'post',
      data,
    }),
  verify: (token: string) =>
    request('http://webesports.fishiny.com/api/simple/verify', {
      params: { token },
    }),
};
