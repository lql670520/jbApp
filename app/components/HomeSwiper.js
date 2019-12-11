import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Block, Text, Icon, Legned} from './common';

export default class HomeSwiper extends Component {
  _handleWarnCenter = path => {
    Actions.push(path);
  };

  _showItem = () => {
    return (
      <Block flex={false} row space={'around'} padding={[0, 20]}>
        {items.map((item, i) => {
          return (
            <Block
              touchableOpacity
              ref={tbox => (this.tbox = tbox)}
              key={i}
              onPress={() => {
                this._handleWarnCenter(item.path);
              }}>
              <Block flex={false} center>
                <Icon image size={35} name={item.img} />
                <Text gray1 body margin={[10, 0, 0, 0]}>
                  {item.title}
                </Text>
                {item.isLegned ? <Legned number={100} /> : null}
              </Block>
            </Block>
          );
        })}
      </Block>
    );
  };

  render() {
    return (
      <Block {...this.props}>
        <Block
          flex={false}
          color="white"
          borderRadius={50}
          padding={[20, 0]}
          margin={[0, 10]}>
          {this._showItem()}
        </Block>
      </Block>
    );
  }
}

const items = [
  {
    title: '预警中心',
    path: 'warnTrendPage',
    img: require('../assets/img/warn_center.png'),
    isLegned: true,
  },
  {
    title: '巡检中心',
    path: 'patrolPage',
    img: require('../assets/img/patrol_center.png'),
    isLegned: false,
  },
  {
    title: '安全报告',
    path: 'safetyReportPage',
    img: require('../assets/img/safety_report.png'),
    isLegned: false,
  },
  {
    title: '安全趋势',
    path: 'safetyTrendPage',
    img: require('../assets/img/safety_trend.png'),
    isLegned: false,
  },
];
