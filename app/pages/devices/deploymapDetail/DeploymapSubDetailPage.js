import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {StyleSheet} from 'react-native';

import {theme} from '../../../constants';
import {Container, Header, Block, Tabs} from '../../../components/common';
import {DepButton} from '../../../components/DepButton';
import SafetyPoint from '../../../components/SafetyPoint';
import DevicesTabBox from '../../../components/DevicesTabBox';
// import DeploymapBox from '../../../components/DeploymapBox';
import PickerDeploymap from '../../../components/PickerDeploymap';
// import DeploymapDetailTab from './DeploymapDetailTab';
// import DeploymapTab from '../DeploymapTab';
import DangerNodeTab from '../DangerNodeTab';
import SafetyNodeTab from '../SafetyNodeTab';
import SafetyReportTab from '../SafetyReportTab';

class DeploymapDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dangerNodeFilter: {
        dangerLevelFilter: {id: 0},
        analyseFilter: {id: 0},
        categoryFilter: {id: 0, code: ''},
      },
      safetyNodeFilter: {
        categoryFilter: {id: 0, code: ''},
      },
    };
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    if (params && params.id) {
      this.fetchDetail().then(_ => {
        this.fetch();
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentItem.id !== this.props.currentItem.id) {
      this.fetch(newProps.currentItem.id);
    }
  }

  fetchDetail = () => {
    const {params} = this.props;
    return this.props.dispatch({
      type: 'deploymapSub/detail',
      payload: {
        sub: true,
        id: params.id,
      },
    });
  };
  removeAttention = () => {
    const {currentItem, dispatch} = this.props;
    if (currentItem && currentItem.id && currentItem.attention_id) {
      dispatch({
        type: 'attentionDeploymap/remove',
        payload: {
          ids: [currentItem.attention_id],
        },
      }).then(v => {
        this.fetchDetail();
      });
    }
  };
  addAttention = () => {
    const {currentItem, dispatch} = this.props;
    if (currentItem && currentItem.id) {
      dispatch({
        type: 'attentionDeploymap/create',
        payload: {
          project_id: currentItem.project ? currentItem.project.id : '',
          deploymap_id: currentItem.id,
        },
      }).then(v => {
        this.fetchDetail();
      });
    }
  };

  fetch = id => {
    const {currentItem} = this.props;
    //刷新问题监测点
    this.dangerNodeOnRefresh({
      deploymap_id: id ? id : currentItem.id,
    });

    //刷新安全监测点
    this.safetyNodeOnRefresh({
      deploymap_id: id ? id : currentItem.id,
    });

    //刷新安全报告
    this.reportOnRefresh({
      deploymap_id: id ? id : currentItem.id,
    });
  };

  //刷新安全报告
  reportOnRefresh = payload => {
    this.reportTab.swipeView.onRefresh(() => {
      return this.fetchReport(payload);
    });
  };
  //查询安全报告
  fetchReport = payload => {
    const {dispatch, currentItem, currentProject} = this.props;
    return dispatch({
      type: 'deploymapReport/list',
      payload: {
        project_id: currentProject.id,
        deploymap_id: currentItem.id,
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
    const {dispatch, currentItem, currentProject} = this.props;
    return dispatch({
      type: 'node/list',
      payload: {
        project_id: currentProject.id,
        deploymap_id: currentItem.id,
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
    const {dispatch, currentItem, currentProject} = this.props;
    return dispatch({
      type: 'nodeSafety/list',
      payload: {
        project_id: currentProject.id,
        deploymap_id: currentItem.id,
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
      currentDep, //当前父网格
      currentItem,
      list,
      nodeList,
      nodePagination,
      nodeSafetyList,
      nodeSafetyPagination,
      reportList,
      reportPagination,
    } = this.props;

    const dangerFliter = [
      this.state.dangerNodeFilter.dangerLevelFilter,
      this.state.dangerNodeFilter.analyseFilter,
      this.state.dangerNodeFilter.categoryFilter,
    ];
    const safetyFliter = [this.state.safetyNodeFilter.categoryFilter];

    const tabsConfig = [
      {
        tabComponent: (
          <DevicesTabBox
            border={[0]}
            count={currentItem.node_alert}
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
          <DevicesTabBox count={currentItem.node_safety} name={'安全监测点'} />
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
          <DevicesTabBox count={currentItem.report_amount} name={'安全报告'} />
        ),
        tabContainer: (
          <SafetyReportTab
            ref={reportTab => (this.reportTab = reportTab)}
            pagination={reportPagination}
            data={reportList}
            callLoadData={payload => {
              return this.fetchReport(payload);
            }}
          />
        ),
      },
    ];
    return (
      <Container color={`alertColor${currentItem.alert_level}`}>
        {/* 头部 */}
        <Header
          noColor
          leftIcon={['goback']}
          rightIcon={['']}
          dispatch={this.props.dispatch}
        />

        <Block flex={false} margin={[0, 20]}>
          <Block
            flex={false}
            color="rgba(255,255,255,0.7)"
            height={'200%'}
            width={'100%'}
            absolute
            style={{top: 0, alignSelf: 'center'}}
          />
          <Block flex={false}>
            <Block flex={false} margin={[20, 0, 0, 20]}>
              <PickerDeploymap
                margin={[0, 20, 0, 0]}
                list={list}
                currentItem={currentItem}
                parentId={currentDep.id}
              />

              <Block flex={false} row space="between" margin={[10, 0, 0, 0]}>
                <SafetyPoint
                  safetyPoint={Math.round(currentItem.safety_point || 0)}
                  alertLevel={currentItem.alert_level}
                  middle
                />

                <Block flex={false} row right>
                  <Block flex={false}>
                    <DepButton
                      type="linkman"
                      title={currentItem.contact_leader}
                    />
                    <DepButton
                      title={`通知人${currentItem.contact_amount}人`}
                    />

                    {currentItem.attention_id &&
                    currentItem.attention_id > 0 ? (
                      <DepButton
                        title={'取消关注'}
                        onPress={this.removeAttention}
                      />
                    ) : (
                      <DepButton title={'关注'} onPress={this.addAttention} />
                    )}
                  </Block>
                </Block>
              </Block>
            </Block>
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
export default connect(
  ({init, deploymap, node, nodeSafety, deploymapSub, deploymapReport}) => ({
    currentProject: init.currentProject,
    list: deploymapSub.list,
    currentItem: deploymapSub.currentItem,
    currentDep: deploymap.currentItem, //当前父网格
    nodeList: node.pagedList,
    nodePagination: node.pagination,
    nodeSafetyList: nodeSafety.pagedList,
    nodeSafetyPagination: nodeSafety.pagination,
    reportList: deploymapReport.pagedList,
    reportPagination: deploymapReport.pagedList,
  }),
)(DeploymapDetailPage);
