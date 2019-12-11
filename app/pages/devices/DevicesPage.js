import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {theme} from '../../constants';
import {
  Container,
  Header,
  Block,
  Text,
  Tabs,
  Icon,
} from '../../components/common';
import PickerProject from '../../components/PickerProject';
import DevicesTabBox from '../../components/DevicesTabBox';
import {alertLevels} from '../../constants/status';
import NodeTabPage from './NodeTabPage';
import Test from './Test';

class DevicesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dangerLevelFilter: {id: 0},
      analyseFilter: {id: 0},
      categoryFilter: {id: 0, code: ''},
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentProject !== this.props.currentProject) {
      this.fetch(newProps.currentProject.id);
    }
  }

  fetch = projectId => {
    const {currentProject} = this.props;
    //刷新监测点
    this.nodeOnRefresh({project_id: projectId ? projectId : currentProject.id});
  };

  //监测点
  nodeOnRefresh = payload => {
    this.nodeTabPage.swipeView.onRefresh(() => {
      return this.fetchNode(payload);
    });
  };

  //查找监测点
  fetchNode = payload => {
    const {dispatch, currentProject} = this.props;
    return dispatch({
      type: 'node/list',
      payload: {
        project_id: currentProject.id,
        category_code: this.state.categoryFilter.code
          ? this.state.categoryFilter.code
          : '',
        alert_level:
          this.state.dangerLevelFilter.id && this.state.dangerLevelFilter.id > 0
            ? this.state.dangerLevelFilter.id
            : 10,
        analyse_type:
          this.state.analyseFilter.id && this.state.analyseFilter.id > 0
            ? this.state.analyseFilter.id
            : '',
        page: 1,
        type: 'day',
        ...payload,
      },
    });
  };

  render() {
    const {
      alertLevel,
      projectSafetyPoint,
      nodeList,
      nodePagination,
    } = this.props;

    const fliter = [
      this.state.dangerLevelFilter,
      this.state.analyseFilter,
      this.state.categoryFilter,
    ];

    const tabsConfig = [
      {
        tabComponent: <DevicesTabBox count={13} name={'问题监测点'} />,
        tabContainer: (
          <NodeTabPage
            ref={nodeTabPage => (this.nodeTabPage = nodeTabPage)}
            pagination={nodePagination}
            data={nodeList}
            callLoadData={payload => {
              return this.fetchNode(payload);
            }}
            filter={fliter}
            filterOnPress={() => {
              Actions.filterPage({
                show: {
                  type: ['dangerLevel', 'analyse', 'category'],
                  currentData: fliter,
                  callBack: data => {
                    this.setState({
                      dangerLevelFilter: data[0],
                      analyseFilter: data[1],
                      categoryFilter: data[2],
                    });
                    this.nodeOnRefresh({
                      alert_level:
                        data && data[0] && data[0].id && data[0].id > 0
                          ? data[0].id
                          : 10,
                      analyse_type:
                        data && data[1] && data[1].id && data[1].id > 0
                          ? data[1].id
                          : '',
                      category_code:
                        data && data[2] && data[2].code ? data[2].code : '',
                      page: 1,
                    });
                  },
                },
              });
            }}
          />
        ),
      },
      {
        tabComponent: <DevicesTabBox count={3} name={'安全监测点'} />,
        tabContainer: <Test />,
      },
      {
        tabComponent: <DevicesTabBox count={2} name={'安全网格'} />,
        tabContainer: <Test />,
      },
    ];

    return (
      <Container color={`alertColor${alertLevel}`}>
        {/* 头部 */}
        <Header noColor leftIcon={['message']} rightIcon={['menu']} />
        <Block flex={false} center middle>
          <Block
            flex={false}
            color="rgba(255,255,255,0.7)"
            height={'200%'}
            width={'90%'}
            // margin={[0, 20]}
            absolute
            style={{top: 0}}
          />
          {/* {/* 项目选择框 */}
          <PickerProject margin={[15, 0]} componentType="medium" />
          <Text
            center
            middle
            h4
            semibold
            lineHeight={90}
            color={`alertColor${alertLevel}`}>
            {projectSafetyPoint}
          </Text>
          <Block flex={false} row center middle margin={[-10, 0, 0, 0]}>
            {alertLevel == '4' ? (
              <Icon
                image
                name={require('../../assets/img/alert4.png')}
                size={20}
                style={{marginRight: 5}}
              />
            ) : null}

            <Text center color={`alertColor${alertLevel}`}>
              {alertLevels[alertLevel] && alertLevels[alertLevel].name
                ? alertLevels[alertLevel].name
                : ''}
            </Text>
          </Block>
        </Block>

        <Block color={theme.colors.gray_} margin={[20, 0, 0, 0]}>
          {/* tabs */}
          <Tabs
            tabsConfig={tabsConfig}
            style={styles.tabs}
            activeStyle={styles.activeStyle}
            // tab
            tabBarStyle={styles.tabBarStyle}
            activeColor={theme.colors.black}
          />
        </Block>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    width: '90%',
    marginBottom: 15,
  },
  tabBarStyle: {
    height: 80,
    backgroundColor: '#fff',
    width: (theme.deviceInfo.width * 0.9) / 3,
  },
  activeStyle: {
    backgroundColor: '#D1E5FE',
    width: '90%',
  },
});

export default connect(({init, countProject, node}) => ({
  alertLevel: init.summery.alertLevel,
  currentProject: init.currentProject,
  projectSafetyPoint: countProject.projectSafetyPoint[0],
  nodeList: node.pagedList,
  nodePagination: node.pagination,
}))(DevicesPage);
