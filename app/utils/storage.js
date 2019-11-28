/**
 * 本地存储函数
 */
import {AsyncStorage} from 'react-native';

/**
 * 通过key获取
 * @param {*} key
 * @param {*} defaultValue
 */
function get(key, defaultValue = null) {
  return AsyncStorage.getItem(key).then(value =>
    value !== null ? JSON.parse(value) : defaultValue,
  );
}

/**
 * 保存/更新
 * @param {*} key
 * @param {*} value
 */
function save(key, value) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

//删除
function remove(key) {
  return AsyncStorage.removeItem(key);
}

//清空
function clear() {
  return AsyncStorage.clear();
}

//多个获取
function multiGet(...keys) {
  return AsyncStorage.multiGet([...keys]).then(stores => {
    const data = {};
    stores.forEach((result, i, store) => {
      data[store[i][0]] = JSON.parse(store[i][1]);
    });
    return data;
  });
}

//多个删除
function multiRemove(...keys) {
  return AsyncStorage.multiRemove([...keys]);
}

export default {
  clear,
  get,
  save,
  remove,
  multiGet,
  multiRemove,
};
