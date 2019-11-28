import request from '../utils/request';

// 登录
export function login({account, password}) {
  return request({
    url: '/login/account',
    type: 'post',
    data: {
      userName: account,
      password,
      // type: "5" //限制集团用户
    },
  });
}

// 退出登录
export function logout({userId}) {
  return request({
    url: `/user/${userId}/logout`,
    type: 'post',
  });
}
