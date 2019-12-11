import {DEFAULT_PAGE_SIZE} from '../constants/config';
import {
  list,
  detail,
  getRealtimeData,
  getHistoryData,
  getAnalyseData,
} from '../services/node';

export default {
  namespace: 'node',

  state: {
    pagedList: [],
    list: [],
    filter: {
      project_id: '',
    },
    selectedRowKeys: [],
    pagination: {
      total: 0,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    realtimeData: [],
    historyData: [],
    currentItem: {},
    analyseData: [],
    safetyEventData: [],
    editType: 'create',
    sorter: {
      field: 'safety_point',
      order: 'asc',
    },
  },

  effects: {
    *list({payload = {}}, {call, put, select}) {
      const {page, pageSize, all, sorter, ...filter} = payload;

      // 获取简单的下拉列表数据的情况
      if (all === true) {
        const {data} = yield call(list, {
          all: true,
          ...filter,
        });

        yield put({
          type: 'updateState',
          payload: {list: data},
        });
        return;
      }

      // 获取分页列表数据的情况
      const prevPagination = yield select(state => state.node.pagination);
      const prevFilter = yield select(state => state.node.filter);
      const prevSorter = yield select(state => state.node.sorter);

      const nextFilter = {...prevFilter, ...filter};
      const nextPagination = {
        ...prevPagination,
        page: page || prevPagination.page,
        pageSize: pageSize || prevPagination.pageSize,
      };
      const nextSorter = {...prevSorter, ...sorter};
      yield put({
        type: 'updateState',
        payload: {
          filter: nextFilter,
          pagination: nextPagination,
          sorter: nextSorter,
        },
      });

      const {pagination, data} = yield call(list, {
        ...nextFilter,
        page: nextPagination.page,
        pageSize: nextPagination.pageSize,
        sortBy: nextSorter.field,
        sortOr: nextSorter.order,
      });

      yield put({
        type: 'updateState',
        payload: {
          //   pagedList: data,
          pagedList: pagination.total == 0 ? [] : data,
          pagination: {...nextPagination, ...pagination},
        },
      });
    },
    *detail({payload}, {call, put, select}) {
      const {data} = yield call(detail, {id: payload.id});

      yield put({
        type: 'updateState',
        payload: {
          currentItem: data,
        },
      });
    },

    *getRealtimeData({payload}, {call, put, select}) {
      const {data} = yield call(getRealtimeData, {node_id: payload.id});

      yield put({
        type: 'updateState',
        payload: {
          realtimeData: data,
        },
      });
    },
    *getHistoryData({payload}, {call, put, select}) {
      const {data} = yield call(getHistoryData, payload);

      yield put({
        type: 'updateState',
        payload: {
          historyData: data,
          // analyseData:analyse
        },
      });
    },
    *getAnalyseData({payload}, {call, put, select}) {
      const {data} = yield call(getAnalyseData, payload);
      yield put({
        type: 'updateState',
        payload: {
          analyseData: data,
        },
      });
    },
    // *getSafetyEventData({payload}, {call, put, select}) {
    //   const {data} = yield call(getSafetyEventData, payload);

    //   yield put({
    //     type: 'updateState',
    //     payload: {
    //       safetyEventData: data,
    //     },
    //   });
    // },
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
