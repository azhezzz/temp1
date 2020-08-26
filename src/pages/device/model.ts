import { Effect, ImmerReducer, Subscription } from 'umi';
import pathToRegexp from 'path-to-regexp';

import { DeviceInfoType } from './constant';

export interface DeviceModelState {
  name: string;
  type: DeviceInfoType;
}
export interface DeviceModelType {
  namespace: 'device';
  state: DeviceModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    // 启用 immer 之后
    save: ImmerReducer<DeviceModelState>;
  };
  subscriptions: { setup: Subscription };
}
const DeviceModel: DeviceModelType = {
  namespace: 'device',
  state: {
    name: '',
    type: DeviceInfoType.PANEL,
  },
  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      state.name = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const parse = pathToRegexp('/device/:type').exec(pathname);

        const type = parse?.[1];
        console.log(type);
      });
    },
  },
};
export default DeviceModel;
