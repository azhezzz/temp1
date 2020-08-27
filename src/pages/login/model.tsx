import { Effect, ImmerReducer, Subscription, history } from 'umi';
import { API } from '@/api';

export interface UserModelState {
  name: string;
}
export interface UserModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    // 启用 immer 之后
    save: ImmerReducer<UserModelState>;
  };
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
        values.remember
          ? globalThis?.localStorage?.setItem('t', res?.data?.token)
          : globalThis?.sessionStorage?.setItem('t', res?.data?.token);
        yield call(refresh);
        history.push('/');
      } catch (error) {}
    },
  },
  reducers: {
    save(state, action) {
      state.name = action.payload;
    },
  },
};
export default UserModel;
