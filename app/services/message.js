import request from '../utils/request';

export function list(data) {
  return request({
    url: '/api/message',
    type: 'get',
    data: data,
  });
}
