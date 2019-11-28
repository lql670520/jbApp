/**
 * dva-core配置
 */
import React from 'react';
import {create} from 'dva-core';
import {Provider, connect} from 'react-redux';

export {connect};

export default function(options) {
  // 1.创建dva实例，可传递配置参数。
  const app = create(options);

  // 2.装载models对象
  if (!global.registered) {
    options.models.forEach(model => app.model(model)); // 如果注册过 model 则不需再次注册
  }
  global.registered = true; // 注：golbal 为react native 全局变量   类似 window

  // 3.实例初始化
  app.start();

  // 4.获取redux的store对象供react-redux使用
  const store = app._store;

  // 将路由通过该函数返回
  app.start = container => () => <Provider store={store}>{container}</Provider>;

  // 将 store 通过该方法返回
  app.getStore = () => store;

  return app;
}
