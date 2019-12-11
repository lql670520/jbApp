import request from '../utils/request';

export function list(data) {
  return request({
    url: '/api/log_safety_event',
    type: 'get',
    data: data,
  });
}
