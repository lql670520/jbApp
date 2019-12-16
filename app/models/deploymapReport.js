import {list, detail, analyse} from '../services/deploymapReport';
import {DEFAULT_PAGE_SIZE} from '../constants/config';

export default {
  namespace: 'deploymapReport',

  state: {
    pagedList: [],
    list: [],
    filter: {},
    selectedRowKeys: [],
    pagination: {
      total: 0,
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
    },
    currentItem: {},
    analyseData: {},
    editType: 'create',
    sorter: {
      field: 'mdtime',
      order: 'desc',
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
      const prevPagination = yield select(
        state => state.deploymapReport.pagination,
      );
      const prevFilter = yield select(state => state.deploymapReport.filter);
      const prevSorter = yield select(state => state.deploymapReport.sorter);

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
          editType: 'detail',
          currentItem: data,
        },
      });
    },
    *analyse({payload}, {call, put, select}) {
      const analyseData = yield call(analyse, {id: payload.id});
      yield put({
        type: 'updateState',
        payload: {
          analyseData: analyseData ? analyseData.data : {},
        },
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
  },
};
