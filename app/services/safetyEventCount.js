import request from '../utils/request';

export function trend(data) {
  return request({
    url: '/api/count/safety_event',
    type: 'get',
    data: data,
  });
}
