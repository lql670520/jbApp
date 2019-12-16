import {DEFAULT_PAGE_SIZE} from '../constants/config';
import {list, detail} from '../services/deploymap';

export default {
  namespace: 'deploymapSub',

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
    sorter: {
      field: 'mdtime',
      order: 'asc',
    },
    currentItem: {},
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
      const prevPagination = yield select(state => state.deploymapSub.pagination);
      const prevFilter = yield select(state => state.deploymapSub.filter);
      const prevSorter = yield select(state => state.deploymapSub.sorter);

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
