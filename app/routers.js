import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import {Toast, Loading, Block, Icon} from './components/common';

import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import DevicesPage from './pages/devices/DevicesPage';
import AttentionPage from './pages/attention/AttentionPage';
import SafetyPointPage from './pages/home/safetyPoint/SafetyPointPage';
import WarnTrendPage from './pages/home/warnTrend/WarnTrendPage';
import SafetyReportPage from './pages/home/safetyReport/SafetyReportPage';
import SafetyTrendPage from './pages/home/safetyTrend/SafetyTrendPage';
import PatrolPage from './pages/home/patrol/PatrolPage';
import FilterPage from './pages/filter/FilterPage';

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
            <Scene
              key="filterPage"
              component={FilterPage}
              hideNavBar={true} //不要头部
              // initial={true} //默认选中值
            />
            <Scene
              key="safetyPointPage"
              component={SafetyPointPage}
              hideNavBar={true}
            />
            <Scene
              key="safetyReportPage"
              component={SafetyReportPage}
              hideNavBar={true}
            />
            <Scene
              key="safetyTrendPage"
              component={SafetyTrendPage}
              hideNavBar={true}
            />
            <Scene
              key="warnTrendPage"
              component={WarnTrendPage}
              hideNavBar={true}
            />
            <Scene key="patrolPage" component={PatrolPage} hideNavBar={true} />
            <Tabs
              key="mainPage"
              hideNavBar={true}
              lazy={true} //懒加载
              // inactiveTintColor={theme.colors.black} //指定标签栏图标的未选中色调颜色。
              // activeTintColor={theme.colors.bule} // 	指定标签栏图标的选中色调颜色。
              // activeBackgroundColor="red" // 	指定焦点的选项卡的选中背景颜色。
              // inactiveBackgroundColor="gray" //	 	指定非焦点的选项卡的未选中背景颜色。
              // initial={true} //默认选中值
            >
              <Scene
                key="homePage"
                tabBarLabel="仪表盘"
                component={HomePage}
                hideNavBar={true}
                icon={({focused, horizontal, tintColor}) => {
                  return (
                    <Icon
                      image
                      name={
                        focused
                          ? require('./assets/img/t_ybp.png')
                          : require('./assets/img/t_ybp_f.png')
                      }
                      size={27}
                    />
                  );
                }}
              />
              <Scene
                key="devicesPage"
                tabBarLabel="监测点"
                component={DevicesPage}
                hideNavBar={true}
                icon={({focused, horizontal, tintColor}) => {
                  return (
                    <Icon
                      image
                      name={
                        focused
                          ? require('./assets/img/t_jcd.png')
                          : require('./assets/img/t_jcd_f.png')
                      }
                      size={27}
                    />
                  );
                }}
              />
              {/* <Scene
                key="patrolPage"
                tabBarLabel="巡检"
                component={PatrolPage}
                hideNavBar={true}
                icon={({focused, horizontal, tintColor}) => {
                  return (
                    <Icon name={'ios-briefcase'} style={{color: tintColor}} />
                  );
                }}
              /> */}
              <Scene
                key="attentionPage"
                tabBarLabel="隐患追踪"
                component={AttentionPage}
                hideNavBar={true}
                icon={({focused, horizontal, tintColor}) => {
                  return (
                    <Icon
                      image
                      name={
                        focused
                          ? require('./assets/img/t_zzyh.png')
                          : require('./assets/img/t_zzyh_f.png')
                      }
                      size={27}
                    />
                  );
                }}
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
