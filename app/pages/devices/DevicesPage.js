import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {theme} from '../../constants';
import {Container, Header, Block, Tabs} from '../../components/common';
import PickerProject from '../../components/PickerProject';
import DevicesTabBox from '../../components/DevicesTabBox';
import SafetyPoint from '../../components/SafetyPoint';
import DangerNodeTab from './DangerNodeTab';
import SafetyNodeTab from './SafetyNodeTab';
import DeploymapTab from './DeploymapTab';

class DevicesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dangerNodeFilter: {
        dangerLevelFilter: {id: 0},
        analyseFilter: {id: 0},
        categoryFilter: {id: 0, code: ''},
      },
      safetyNodeFilter: {
        // analyseFilter: {id: 0},
        categoryFilter: {id: 0, code: ''},
      },
      deploymapFilter: {
        alertLevelFilter: {id: 0},
      },
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
    //刷新问题监测点
    this.dangerNodeOnRefresh({
      project_id: projectId ? projectId : currentProject.id,
    });

    //刷新安全监测点
    this.safetyNodeOnRefresh({
      project_id: projectId ? projectId : currentProject.id,
    });

    //刷新区域网格
    this.deploymapOnRefresh({
      project_id: projectId ? projectId : currentProject.id,
    });
  };

  //网格刷新
  deploymapOnRefresh = payload => {
    this.deploymapTab.swipeView.onRefresh(() => {
      return this.fetchDeploymap(payload);
    });
  };

  fetchDeploymap = payload => {
    const {dispatch, currentProject} = this.props;
    return dispatch({
      type: 'deploymap/list',
      payload: {
        project_id: currentProject.id,
        parent_id: 0,
        alert_level:
          this.state.deploymapFilter.alertLevelFilter.id &&
          this.state.deploymapFilter.alertLevelFilter.id > 0
            ? this.state.deploymapFilter.alertLevelFilter.id
            : '',
        page: 1,
        ...payload,
      },
    });
  };

  //问题监测点
  dangerNodeOnRefresh = payload => {
    this.dangerNodeTab.swipeView.onRefresh(() => {
      return this.fetchDangerNode(payload);
    });
  };

  //查找监测点
  fetchDangerNode = payload => {
    const {dispatch, currentProject} = this.props;
    return dispatch({
      type: 'node/list',
      payload: {
        project_id: currentProject.id,
        deploymap_id: '',
        category_code: this.state.dangerNodeFilter.categoryFilter.code
          ? this.state.dangerNodeFilter.categoryFilter.code
          : '',
        alert_level:
          this.state.dangerNodeFilter.dangerLevelFilter.id &&
          this.state.dangerNodeFilter.dangerLevelFilter.id > 0
            ? this.state.dangerNodeFilter.dangerLevelFilter.id
            : 10,
        analyse_type:
          this.state.dangerNodeFilter.analyseFilter.id &&
          this.state.dangerNodeFilter.analyseFilter.id > 0
            ? this.state.dangerNodeFilter.analyseFilter.id
            : '',
        page: 1,
        type: 'day',
        ...payload,
      },
    });
  };

  //安全监测点
  safetyNodeOnRefresh = payload => {
    this.safetyNodeTab.swipeView.onRefresh(() => {
      return this.fetchSafetyNode(payload);
    });
  };

  fetchSafetyNode = payload => {
    const {dispatch, currentProject} = this.props;
    return dispatch({
      type: 'nodeSafety/list',
      payload: {
        project_id: currentProject.id,
        deploymap_id: '',
        category_code: this.state.safetyNodeFilter.categoryFilter.code
          ? this.state.safetyNodeFilter.categoryFilter.code
          : '',
        alert_level: 1,
        // analyse_type:
        //   this.state.safetyNodeFilter.analyseFilter.id &&
        //   this.state.safetyNodeFilter.analyseFilter.id > 0
        //     ? this.state.safetyNodeFilter.analyseFilter.id
        //     : '',
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
      nodeSafetyList,
      nodeSafetyPagination,
      deploymapList,
      deploymapPagination,
      projectSummery,
    } = this.props;

    const dangerFliter = [
      this.state.dangerNodeFilter.dangerLevelFilter,
      this.state.dangerNodeFilter.analyseFilter,
      this.state.dangerNodeFilter.categoryFilter,
    ];
    const safetyFliter = [
      // this.state.safetyNodeFilter.analyseFilter,
      this.state.safetyNodeFilter.categoryFilter,
    ];
    const deploymapFliter = [this.state.deploymapFilter.alertLevelFilter];

    const tabsConfig = [
      {
        tabComponent: (
          <DevicesTabBox
            border={[0]}
            count={projectSummery.node_alert ? projectSummery.node_alert : 0}
            name={'问题监测点'}
          />
        ),
        tabContainer: (
          <DangerNodeTab
            ref={dangerNodeTab => (this.dangerNodeTab = dangerNodeTab)}
            pagination={nodePagination}
            data={nodeList}
            callLoadData={payload => {
              return this.fetchDangerNode(payload);
            }}
            filter={dangerFliter}
            filterOnPress={() => {
              Actions.filterPage({
                show: {
                  type: ['dangerLevel', 'analyse', 'category'],
                  currentData: dangerFliter,
                  callBack: data => {
                    this.setState({
                      dangerNodeFilter: {
                        dangerLevelFilter: data[0],
                        analyseFilter: data[1],
                        categoryFilter: data[2],
                      },
                    });
                    this.dangerNodeOnRefresh({
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
        tabComponent: (
          <DevicesTabBox
            count={projectSummery.node_safety ? projectSummery.node_safety : 0}
            name={'安全监测点'}
          />
        ),
        tabContainer: (
          <SafetyNodeTab
            ref={safetyNodeTab => (this.safetyNodeTab = safetyNodeTab)}
            pagination={nodeSafetyPagination}
            data={nodeSafetyList}
            callLoadData={payload => {
              return this.fetchSafetyNode(payload);
            }}
            filter={safetyFliter}
            filterOnPress={() => {
              Actions.filterPage({
                show: {
                  type: ['category'],
                  currentData: safetyFliter,
                  callBack: data => {
                    this.setState({
                      safetyNodeFilter: {
                        // analyseFilter: data[0],
                        categoryFilter: data[0],
                      },
                    });
                    this.safetyNodeOnRefresh({
                      alert_level: 1,
                      // analyse_type:
                      //   data && data[0] && data[0].id && data[0].id > 0
                      //     ? data[0].id
                      //     : '',
                      category_code:
                        data && data[0] && data[0].code ? data[0].code : '',
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
        tabComponent: (
          <DevicesTabBox
            count={
              projectSummery.deploymap_amount
                ? projectSummery.deploymap_amount
                : 0
            }
            name={'安全网格'}
          />
        ),
        tabContainer: (
          <DeploymapTab
            ref={deploymapTab => (this.deploymapTab = deploymapTab)}
            pagination={deploymapPagination}
            data={deploymapList}
            callLoadData={payload => {
              return this.fetchDeploymap(payload);
            }}
            filter={deploymapFliter}
            filterOnPress={() => {
              Actions.filterPage({
                show: {
                  type: ['alertLevel'],
                  currentData: deploymapFliter,
                  callBack: data => {
                    this.setState({
                      deploymapFilter: {
                        // analyseFilter: data[0],
                        alertLevelFilter: data[0],
                      },
                    });
                    this.deploymapOnRefresh({
                      parent_id: 0,
                      alert_level:
                        data && data[0] && data[0].id ? data[0].id : '',
                      page: 1,
                    });
                  },
                },
              });
            }}
          />
        ),
      },
    ];

    return (
      <Container color={`alertColor${alertLevel}`}>
        {/* 头部 */}
        <Header
          noColor
          leftIcon={['message']}
          rightIcon={['menu']}
          dispatch={this.props.dispatch}
        />
        <Block flex={false} margin={[0, 20]}>
          <Block
            flex={false}
            color="rgba(255,255,255,0.7)"
            height={'200%'}
            width={'100%'}
            // margin={[0, 20]}
            absolute
            style={{top: 0, alignSelf: 'center'}}
          />
          {/* {/* 项目选择框 */}
          <PickerProject margin={[15, 0]} componentType="medium" />

          <SafetyPoint
            safetyPoint={projectSafetyPoint}
            alertLevel={alertLevel}
            middle
          />
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
    // width: '90%',
    marginHorizontal: 20,
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

export default connect(({init, countProject, node, nodeSafety, deploymap}) => ({
  alertLevel: init.summery.alertLevel,
  currentProject: init.currentProject,
  projectSafetyPoint: countProject.projectSafetyPoint[0],
  nodeList: node.pagedList,
  nodePagination: node.pagination,
  nodeSafetyList: nodeSafety.pagedList,
  nodeSafetyPagination: nodeSafety.pagination,
  deploymapList: deploymap.pagedList,
  deploymapPagination: deploymap.pagination,
  projectSummery: countProject.summery,
}))(DevicesPage);
