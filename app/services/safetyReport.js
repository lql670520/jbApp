import request from '../utils/request';

export function list(data) {
  return request({
    url: '/api/report',
    type: 'get',
    data: data,
  });
}

export function detail(data) {
  return request({
    url: `/api/report/${data.id}`,
    type: 'get',
  });
}

export function analyse(data) {
  return request({
    url: `/api/report/${data.id}/analyse`,
    type: 'get',
  });
}
