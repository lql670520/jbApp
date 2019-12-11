import * as api from '../services/safetyEventCount';
export default {
  namespace: 'safetyEventCount',

  state: {
    trend: {
      event: [{name: null, weight: 0, value: []}],
      time: [],
      node: [{name: null, value: []}],
      node_amount: 0,
      event_amount: 0,
    },
  },

  effects: {
    *trend({payload = {}}, {call, put, select}) {
      // 获取简单的下拉列表数据的情况
      const {data} = yield call(api.trend, payload);

      yield put({
        type: 'updateState',
        payload: {trend: data},
      });
      return;
    },
  },

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
