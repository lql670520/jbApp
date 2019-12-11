/**
 * 初始化数据\全局
 */
import {Actions} from 'react-native-router-flux';

import * as api from '../services/init';

export default {
  namespace: 'init',
  state: {
    //是否加载数据
    loadding: {
      isShow: false,
      timeout: -1, //显示时间，-1为无限
      text: '加载中...',
    },
    //当前用户
    currentUser: {
      id: '',
      account: '',
      nickname: '',
      realname: '',
      phone: '',
    },
    //项目// {id, name, children: [{id, name}]}
    projects: [],
    //当前项目
    currentProject: {
      id: '',
      category: [], //分类
    },
    //统计
    summery: {
      //当前告警等级
      alertLevel: 1,
      ces: '12321',
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

        //刷新其他数据
        yield put({
          type: 'updateCurrentProject',
          payload: {
            data: currentProject,
          },
          isInit: true,
        });
      } else {
        Actions.popTo('loginPage'); //返回登录页
      }
    },

    // 切换/修改当前项目
    *updateCurrentProject({payload = {}, isInit = false}, {call, put, select}) {
      const projectId = payload.data.id;
      //如果是初始化
      if (!isInit) {
        const currentProject = yield select(state => state.init.currentProject);
        //如果id一样不用切换
        if (currentProject.id === projectId) {
          return;
        }

        //1.修改当前项目
        yield put({
          type: 'updateState',
          payload: {
            currentProject: payload.data,
          },
        });
      }

      //2.获取项目评分
      yield put({
        type: 'countProject/getProjectSafetyPoint',
      });

      //2.获取项目评分
      yield put({
        type: 'countProject/summery',
      });
    },
  },

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },

    //修改统计
    updateSummery(state, {payload}) {
      console.log('修改', {
        ...state,
        summery: {...payload.summery},
      });
      return {
        ...state,
        summery: {...payload.summery},
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
