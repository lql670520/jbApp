import {DeviceEventEmitter} from 'react-native';

//吐司调用
const toast = msg => {
  DeviceEventEmitter.emit('toast', msg);
};

//加载调用
const loading = payload => ({type: 'init/loading', payload});

export default {toast, loading};
