/**
 * 初始化数据
 */
import {Actions} from 'react-native-router-flux';
import * as api from '../services/init';
import storage from '../utils/storage';
import common from '../utils/common';

export default {
  namespace: 'init',
  state: {
    loadding: {
      isShow: false,
      timeout: -1, //显示时间，-1为无限
      text: '加载中...',
    },

    currentRouter: '', //当前路由
    // sms: {
    //   tran_id: null,
    // },
    currentUser: {
      id: '',
      account: '',
      nickname: '',
      realname: '',
      phone: '',
    },
    projects: [], // {id, name, children: [{id, name}]}
    currentProject: {
      id: '',
      category: [], //分类
    },
  },

  //   subscriptions: {
  //     setup({dispatch}) {
  //       dispatch({type: 'loadStorage'});
  //     },
  //   },

  effects: {
    // 用户初始化
    *userInit(_, {call, put, select}) {
      const {success, data} = yield call(api.userInit);
      if (success) {
        //项目
        let projects = [];
        if (data.projects) {
          projects = data.projects;
          delete data.projects;
        }
        //当前项目
        let currentProject = {};
        if (data.currentProject) {
          currentProject = data.currentProject;
          delete data.currentProject;
        }

        yield put({
          type: 'updateState',
          payload: {
            currentUser: data,
            projects: projects,
            currentProject: currentProject,
          },
        });
      } else {
        Actions.popTo('loginPage'); //返回登录页
      }
    },

    // 切换/修改当前项目
    *updateCurrentProject({payload = {}}, {call, put, select}) {
      const currentProject = yield select(state => state.init.currentProject);
      //如果id一样不用切换
      if (currentProject.id !== payload.data.id) {
        yield put({
          type: 'updateState',
          payload: {
            currentProject: payload.data,
          },
        });
      }
    },
  },

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },

    //修改loading状态
    loading(state, {payload}) {
      return {
        ...state,
        loadding: {
          isShow: payload.isShow,
          text: payload.text ? payload.text : '加载中...',
        },
      };
    },
  },
};
