import request from '../utils/request';

export function list(data) {
  return request({
    url: '/api/node_dashboard',
    type: 'get',
    data: data,
  });
}

export function detail(data) {
  return request({
    url: `/api/node/${data.id}`,
    type: 'get',
  });
}

export function getRealtimeData(data) {
  return request({
    url: '/api/node_realtime_data',
    type: 'get',
    data,
  });
}

export function getHistoryData(data) {
  return request({
    url: '/api/node_history_data',
    type: 'get',
    data,
  });
}

export function getAnalyseData(data) {
  return request({
    url: '/api/node_analyse_data',
    type: 'get',
    data,
  });
}
