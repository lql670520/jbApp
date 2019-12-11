import request from '../utils/request';

// 用户初始化
export function userInit() {
  return request({
    url: '/api/iot/user/init',
    type: 'get',
  });
}
