import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Header} from '../../components/common';
import PickerProject from '../../components/PickerProject';
// import SafetyPointRadar from '../../components/echarts/SafetyPointRadar';
// import HomeSwiper from '../../components/HomeSwiper';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {projects, currentUser, currentProject} = this.props;
    console.log(projects, currentProject, currentUser);
    return (
      <Container color="alertColor3">
        {/* 头部 */}
        <Header noColor leftIcon={['message']} rightIcon={['menu']} />
        {/* {/* 项目选择框 */}
        <PickerProject margin={[10, 0, 0, 0]} componentType="min" />
        {/* 评分雷达图 */}
        {/* <SafetyPointRadar margin={[50, 0, 0, 0]} /> */}
        {/* 其他导航 */}
        {/* <HomeSwiper navigation={navigation} relative={{bottom: 100}} /> */}
      </Container>
    );
  }
}

export default connect(({init}) => ({
  currentUser: init.currentUser,
  currentProject: init.currentProject,
  projects: init.projects,
}))(HomePage);
