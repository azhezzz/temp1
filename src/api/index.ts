import { request } from 'umi';

const delay = (duration: number) => {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, duration);
  });
};

export const API = {
  login: (data: any) =>
    request('/login', { method: 'post', data, requestType: 'form' }),

  changePassword: (data: any) =>
    request('/user/user', { method: 'post', data }),

  getlist: (type: string) => request(`/device/${type}`),

  changeId: ({ type, data }: { type: string; data: any }) =>
    request(`/device/${type}/id`, { method: 'post', data }),
};
