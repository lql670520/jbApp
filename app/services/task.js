import request from '../utils/request';

export function list(data) {
  return request({
    url: '/api/task',
    type: 'get',
    data: data,
  });
}

export function create(data) {
  return request({
    url: '/api/task',
    type: 'post',
    data,
  });
}

export function detail(data) {
  return request({
    url: `/api/task/${data.id}`,
    type: 'get',
  });
}

export function update(data) {
  return request({
    url: `/api/task/${data.id}`,
    type: 'put',
    data,
  });
}

export function remove(data) {
  return request({
    url: '/api/task',
    type: 'delete',
    data,
  });
}
