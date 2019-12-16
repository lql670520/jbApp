import request from '../utils/request';

export function list(data) {
  return request({
    url: '/api/node_deploymap',
    type: 'get',
    data: data,
  });
}

export function detail(data) {
  return request({
    url: `/api/node_deploymap/${data.id}`,
    type: 'get',
  });
}