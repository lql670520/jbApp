## native-echarts的使用:
echarts在react-native版本>=6.0 的时候不能使用,以此需要以下配置：
1. npm install --save react-native-webview

2. 在安卓路径下添加文件assets：\android\app\src\main\assets；且把\node_modules\native-echarts\src\components\Echarts\tmp.html文件拷贝到assets下

3. \node_modules\native-echarts\src\index.js修改代码:
```js
import { WebView,View } from 'react-native'; //删除这段代码，因为react-native6.0以上版本不支持WebView
```

4. \node_modules\native-echarts\src\components\Echarts\index.js修改为以下代码：
```js
import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.setNewOption = this.setNewOption.bind(this);
  }


  componentWillReceiveProps(nextProps) {
  //数据不一样的时候刷新
    if (nextProps.data !== this.props.data) {
      this.refs.chart.reload();
    }
    //下面方法有问题
    // if (nextProps.option !== this.props.option ) {
    //   this.refs.chart.reload();
    // }
  }

  setNewOption(option) {
    this.refs.chart.postMessage(JSON.stringify(option));
  }

  render() {
    const source = (Platform.OS == 'ios') ? require('./tpl.html') : { uri: 'file:///android_asset/tpl.html' } 
    return (
      <View style={{ flex: 1, marginTop: this.props.marginTop || 0,height: this.props.height || 400, }}>
        <WebView
          ref="chart"
          scrollEnabled={false}
          injectedJavaScript={renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          scalesPageToFit={Platform.OS !== 'ios'}
          originWhitelist={['*']}
          // source={require('./tpl.html')}
          source={source}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
```

