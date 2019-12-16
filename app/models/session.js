import {Actions} from 'react-native-router-flux';
import * as api from '../services/session';
import storage from '../utils/storage';
import common from '../utils/common';
// import {DeviceEventEmitter} from 'react-native';

export default {
  namespace: 'session',
  state: {
    userId: null,
    token: null,
  },
  effects: {
    *login({payload: {account, password}}, {call, put}) {
      yield put(common.loading({isShow: true, text: '登录中...'}));

      const {success, data} = yield call(api.login, {account, password});
      if (success) {
        yield put({
          type: 'loginSuccess',
          payload: {user_id: data.id, token: data.token},
        });

        //保存本地
        storage.save('userId', data.id);
        storage.save('token', data.token);

        //用户初始化
        yield put({
          type: 'init/userInit',
        });

        yield put(common.loading({isShow: false}));
        //去首页
        Actions.homePage();
      } else {
        //错误消息
        // common.toast(data);
      }
    },

    *logout({payload}, {call, put, select}) {
      storage.clear();
      Actions.loginPage();
    },
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
    // 登录成功
    loginSuccess(state, {payload: {user_id: userId, token}}) {
      return {
        ...state,
        userId,
        token,
      };
    },

    // 登出成功
    logoutSuccess(state) {
      return {
        ...state,
        userId: null,
        token: null,
      };
    },
  },
};
