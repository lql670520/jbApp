import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {theme} from '../../../constants';
import {Container, Header, Block, Text} from '../../../components/common';
import {DepButton} from '../../../components/DepButton';
import SafetyPoint from '../../../components/SafetyPoint';
import PickerDeploymap from '../../../components/PickerDeploymap';
import DeploymapTab from '../DeploymapTab';

class DeploymapDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deploymapFilter: {
        alertLevelFilter: {id: 0},
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
      type: 'deploymap/detail',
      payload: {
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

    //刷新区域网格
    this.deploymapOnRefresh({
      parent_id: id ? id : currentItem.id,
    });
  };

  //子网格刷新
  deploymapOnRefresh = payload => {
    this.deploymapTab.swipeView.onRefresh(() => {
      return this.fetchDeploymap(payload);
    });
  };

  fetchDeploymap = payload => {
    const {dispatch, currentProject, currentItem} = this.props;
    return dispatch({
      type: 'deploymap/list',
      payload: {
        project_id: currentProject.id,
        parent_id: currentItem.id,
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

  render() {
    const {list, currentItem, deploymapList, deploymapPagination} = this.props;

    const deploymapFliter = [this.state.deploymapFilter.alertLevelFilter];

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
          <DeploymapTab
            sub={true}
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
                      alert_level:
                        data && data[0] && data[0].id ? data[0].id : '',
                      page: 1,
                    });
                  },
                },
              });
            }}
          />
        </Block>
      </Container>
    );
  }
}

export default connect(({init, deploymap}) => ({
  currentProject: init.currentProject,
  deploymapList: deploymap.pagedList,
  deploymapPagination: deploymap.pagination,
  list: deploymap.list,
  currentItem: deploymap.currentItem,
}))(DeploymapDetailPage);
