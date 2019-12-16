import moment from 'moment';
import * as api from '../services/countProject';
import common from '../utils/common';

export default {
  namespace: 'countProject',

  state: {
    list: [],
    trendDay: {time: [], data: []},
    trendMonth: {time: [], data: []},
    project_id: '',
    projectSafetyPoint: [0, 0, 0, 0],
    summery: {
      node_all: 0, //   监测点总数
      node_alert: 0, //  问题监测点
      node_safety: 0, // 安全监测点
      alert_level: 1, //   安全等级
      safety_point: [], // 安全评分
      unread_event: 0, // 未读安全事件
      unread_message: 0, // 未读消息
      unread_report: 0, //未读安全报告
      deploymap_amount: 0, // 父网格数量
    },
  },

  effects: {
    //项目安全评分趋势
    *trend({payload}, {call, put, select}) {
      //获取当前项目id
      const {id} = yield select(state => state.init.currentProject);
      if (!id) {
        return;
      }
      const {success, data} = yield call(api.trend, {
        project_id: id,
        stype: 'node',
        type: 'day',
        safety_code: 1,
        ...payload,
      });
      if (success) {
        if (!data.time) {
          data.time = [];
        }
        yield put({
          type: 'updateState',
          payload:
            payload && payload.type && payload.type === 'month'
              ? {trendMonth: data}
              : {trendDay: data},
        });
      }
    },

    *summery({payload}, {call, put, select}) {
      //获取当前项目id
      const {id} = yield select(state => state.init.currentProject);
      if (id) {
        const {success, data} = yield call(api.summery, {
          project_id: id,
          ...payload,
        });
        console.log('summery', data);

        if (success) {
          yield put({
            type: 'updateState',
            payload: {
              summery: data,
            },
          });
        }
      }
    },

    //获取项目安全评分
    *getProjectSafetyPoint({payload}, {call, put, select}) {
      //获取当前项目id
      const {id} = yield select(state => state.init.currentProject);
      if (id) {
        const {success, data} = yield call(api.safetyPoint, {
          project_id: id,
          date: moment().format('YYYY-MM-DD'),
          type: 'day',
          ...payload,
        });

        if (success) {
          const projectSafetyData = [
            Math.round((data && data[0]) || 0),
            Math.round((data && data[1]) || 0),
            Math.round((data && data[2]) || 0),
            Math.round((data && data[3]) || 0),
          ];
          yield put({
            type: 'updateState',
            payload: {
              projectSafetyPoint: projectSafetyData,
            },
          });

          yield put({
            type: 'init/updateSummery',
            payload: {
              summery: {
                alertLevel: common.getAlertLevelFromSafetyPoint(
                  Math.round((projectSafetyData && projectSafetyData[0]) || 0),
                ),
              },
            },
          });
        }
      } else {
        yield put({
          type: 'updateState',
          payload: {
            projectSafetyPoint: [0, 0, 0, 0],
          },
        });

        yield put({
          type: 'init/updateSummery',
          payload: {
            summery: {
              alertLevel: common.getAlertLevelFromSafetyPoint(0),
            },
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
  },
};
