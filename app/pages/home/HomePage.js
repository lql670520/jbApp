import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {Container, Header, Block} from '../../components/common';
import PickerProject from '../../components/PickerProject';
import SafetyPointRadar from '../../components/echarts/SafetyPointRadar';
import HomeSwiper from '../../components/HomeSwiper';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {alertLevel} = this.props;
    return (
      <Container color={`alertColor${alertLevel}`}>
        {/* 头部 */}
        <Header noColor leftIcon={['message']} rightIcon={['menu']} />
        {/* {/* 项目选择框 */}
        <PickerProject margin={[10, 0]} />
        {/* 评分雷达图 */}
        <SafetyPointRadar onPress={() => Actions.safetyPointPage()} />

        <Block color="#dedede" margin={[40, 0, 0, 0]}>
          {/* 其他导航 */}
          <HomeSwiper relative={{top: -40}} />
        </Block>
      </Container>
    );
  }
}

export default connect(({init}) => ({
  alertLevel: init.summery.alertLevel,
}))(HomePage);
