import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Scene, Tabs, Actions} from 'react-native-router-flux';
import {Toast, Loading, Block} from './components/common';

import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import DevicesPage from './pages/devices/DevicesPage';
import PatrolPage from './pages/patrol/PatrolPage';
import AttentionPage from './pages/attention/AttentionPage';

class Routers extends Component {
  render() {
    return (
      <Block>
        <Router>
          <Scene key="root">
            <Scene
              key="loginPage"
              component={LoginPage}
              hideNavBar={true} //不要头部
              initial={true} //默认选中值
            />

            <Tabs
              key="mainPage"
              hideNavBar={true}
              lazy={true} //懒加载
              inactiveTintColor="gray" //指定标签栏图标的未选中色调颜色。
              // activeTintColor="red" // 	指定标签栏图标的选中色调颜色。
              // activeBackgroundColor="red" // 	指定焦点的选项卡的选中背景颜色。
              // inactiveBackgroundColor="gray" //	 	指定非焦点的选项卡的未选中背景颜色。
              // initial={true} //默认选中值
            >
              <Scene
                key="homePage"
                tabBarLabel="首页"
                component={HomePage}
                hideNavBar={true}
                // icon={({focused, horizontal, tintColor}) => {
                //   return <Icon name={'ios-home'} style={{color: tintColor}} />;
                // }}
              />
              <Scene
                key="devicesPage"
                tabBarLabel="导航"
                component={DevicesPage}
                hideNavBar={true}
                // icon={({focused, horizontal, tintColor}) => {
                //   return <Icon name={'ios-compass'} style={{color: tintColor}} />;
                // }}
              />
              <Scene
                key="patrolPage"
                tabBarLabel="巡检"
                component={PatrolPage}
                hideNavBar={true}
                // icon={({focused, horizontal, tintColor}) => {
                //   return (
                //     <Icon name={'ios-briefcase'} style={{color: tintColor}} />
                //   );
                // }}
              />
              <Scene
                key="attentionPage"
                tabBarLabel="关注"
                component={AttentionPage}
                hideNavBar={true}
                // icon={({focused, horizontal, tintColor}) => {
                //   return <Icon name={'ios-eye'} style={{color: tintColor}} />;
                // }}
              />
            </Tabs>
          </Scene>
        </Router>
        {/* 吐司 */}
        <Toast />
        {/* 加载 */}
        <Loading />
      </Block>
    );
  }
}
export default connect()(Routers);
