import request from '../utils/request';

export function list(data) {
  return request({
    url: '/api/todo_assess',
    type: 'get',
    data: data,
  });
}

export function create(data) {
  return request({
    url: '/api/todo_assess',
    type: 'post',
    data,
  });
}

export function detail(data) {
  return request({
    url: `/api/todo_assess/${data.id}`,
    type: 'get',
  });
}

export function update(data) {
  return request({
    url: `/api/todo_assess/${data.id}`,
    type: 'put',
    data,
  });
}

export function remove(data) {
  return request({
    url: '/api/todo_assess',
    type: 'delete',
    data,
  });
}

export function compare(data) {
  return request({
    url: `/api/todo_assess/${data.id}/compare`,
    type: 'get',
  });
}
