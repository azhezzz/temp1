import { Effect, ImmerReducer, Subscription } from 'umi';
import pathToRegexp from 'path-to-regexp';

import { DeviceInfoType } from './constant';
import { API } from '@/api';

export interface DeviceModelState {
  name: string;
  type: DeviceInfoType;
  dataSrouce: {
    [keyof in DeviceInfoType]: any[];
  };
}
export interface DeviceModelType {
  namespace: string;
  state: DeviceModelState;
  effects: {
    getList: Effect;
  };
  reducers: {
    setType: ImmerReducer<DeviceModelState>;
    setList: ImmerReducer<DeviceModelState>;
  };
  subscriptions: { setup: Subscription };
}
const DeviceModel: DeviceModelType = {
  namespace: 'device',
  state: {
    name: '',
    type: DeviceInfoType.PANEL,
    dataSrouce: {
      [DeviceInfoType.DOOR]: [],
      [DeviceInfoType.METER]: [],
      [DeviceInfoType.PANEL]: [],
      [DeviceInfoType.READER]: [],
    },
  },
  effects: {
    *getList({ payload }, { call, put, select }) {
      const type = yield select(
        ({ device }: { device: DeviceModelState }) => device.type,
      );
      const res = yield call(API.getlist);
      yield put({ type: 'setList', payload: { list: res.data, type } });
    },
  },
  reducers: {
    setType(state, action) {
      state.type = action.payload;
    },
    setList(state, action) {
      const { list, type } = action.payload;
      state.dataSrouce[type as DeviceInfoType] = list;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const parse = pathToRegexp('/device/:type').exec(pathname);
        if (!parse) return;
        const type = parse?.[1];
        dispatch({ type: 'setType', payload: type });
      });
    },
  },
};
export default DeviceModel;
