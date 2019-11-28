import React from 'react';
import {name as appName} from './app.json';
import {AppRegistry} from 'react-native';

import dva from './utils/dva';
import Routers from './routers';
import models from './models';

const app = dva({
  initialState: {},
  models: models,
  // extraReducers: {router: routerReducer},
  // onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e);
  },
});

const App = app.start(<Routers />);

AppRegistry.registerComponent(appName, () => App);
