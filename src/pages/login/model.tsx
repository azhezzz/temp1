import { Effect, ImmerReducer, Subscription, history } from 'umi';
import { API } from '@/api';
import { StorageKey } from '@/constants';
import { message } from 'antd';

export interface UserModelState {
  name: string;
}
export interface UserModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    login: Effect;
    changePassword: Effect;
  };
  reducers: {};
  subscriptions?: { setup: Subscription };
}
const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    name: '',
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const { values, refresh } = payload;
        const res = yield call(API.login, values);
        const token = `${res?.token_type?.substring(0, 1).toUpperCase() +
          res?.token_type?.substring(1)} ${res.access_token}`;
        values.remember
          ? globalThis?.localStorage?.setItem(StorageKey.ACCESS_TOKEN, token)
          : globalThis?.sessionStorage?.setItem(StorageKey.ACCESS_TOKEN, token);
        refresh && (yield call(refresh));
        history.push('/');
      } catch (error) {}
    },
    *changePassword({ payload }, { call, put }) {
      try {
        const { new_password, old_password, user_name } = payload;
        const res = yield call(API.changePassword, {
          new_password,
          old_password,
          user_name,
        });
        globalThis?.localStorage?.clear();
        globalThis?.sessionStorage?.clear();
        history.push('/login');
        message.success('修改密码成功,请重新登陆');
      } catch (error) {}
    },
  },
  reducers: {},
};
export default UserModel;
