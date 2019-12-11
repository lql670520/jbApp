import request from '../utils/request';

//获取安全评分
export function safetyPoint(data) {
  return request({
    url: '/api/count/safety_point',
    type: 'get',
    data: data,
  });
}

//安全评分趋势
export function trend(data) {
  return request({
    url: '/api/count/trend',
    type: 'get',
    data: data,
  });
}

//统计
export function summery(data) {
  return request({
    url: '/api/count/project/',
    type: 'get',
    data: data,
  });
}
