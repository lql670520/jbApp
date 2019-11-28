import axios from 'axios';
import storage from './storage';

//请求路径
const REQUEST_PATH = 'http://app.dev.junbangyunhan.com/v1/api';

//获取Authorization
function getAuthorization() {
  //获取token
  return new Promise(function(resolve) {
    storage.get('token').then(token => {
      return resolve(`Basic ${token}`);
    });
  });
}

export default function request({url, data, type}) {
  return new Promise(function(resolve) {
    getAuthorization().then(authorization => {
      const config = {
        method: type,
        url: `${REQUEST_PATH}${url}`,
        headers: {
          Authorization: authorization,
        },
      };

      if (data) {
        if (type === 'get') {
          config.params = data;
          // let paramStr = '';
          // Object.keys(data).forEach(key => {
          //   paramStr += key + '=' + data[key] + '&';
          // });
          // if (paramStr) {
          //   paramStr = paramStr.substring(0, paramStr.length - 1);
          // }
          // config.params = paramStr;
        } else {
          config.data = data;
        }
      }

      return axios(config)
        .then(res => {
          console.log(res.data.data || res.data);
          return resolve({
            success: true,
            data: res.data.data || res.data,
            pagination: res.data.pagination || {},
          });
        })
        .catch(e => {
          const res = e.response;
          if (!res) {
            alert(e.message);
            return resolve({
              success: false,
              data: null,
            });
          }
          if (res.status === 400) {
            alert(res.data.message || res.data);
            return resolve({
              success: false,
              data: `${res.data.message || res.data}`,
            });
          } else if (res.status === 401) {
            //   const store = window.g_app._store;
            //   store &&
            //     store.dispatch({
            //       type: 'session/logout',
            //       payload: {},
            //     });
            return resolve({success: false});
          } else {
            return resolve({success: false});
          }
        });
    });
  });
}
