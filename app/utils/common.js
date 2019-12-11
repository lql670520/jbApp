import {DeviceEventEmitter} from 'react-native';

//吐司调用
const toast = msg => {
  DeviceEventEmitter.emit('toast', msg);
};

//加载调用
const loading = payload => ({type: 'init/loading', payload});

//获取告警等级 1 安全 2一般隐患 3严重隐患 4告警
const getAlertLevelFromSafetyPoint = safetyPoint => {
  if (safetyPoint < 60) {
    return 4;
  }
  if (safetyPoint < 70) {
    return 3;
  }
  if (safetyPoint < 90) {
    return 2;
  }
  return 1;
};

//在state中创建新对象
const newStateObject = (obj, id = 0) => {
  const _obj = {
    0: {
      id: 0,
      name: '全部',
      image: require('../assets/img/all.png'),
      type: 'image',
      size: 50,
      // active: true,
    },
    ...obj,
  };
  let o = new Object();
  Object.values(_obj).map((v, i) => {
    if (id === v.id) {
      v.active = true;
    } else {
      v.active = false;
    }
    return (o[i] = {...v});
  });

  return o;
};

export default {toast, loading, getAlertLevelFromSafetyPoint, newStateObject};
