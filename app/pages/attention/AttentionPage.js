import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {Container, Content, Header, Tabs} from '../../components/common';
import PickerProject from '../../components/PickerProject';
import PickerDate from '../../components/PickerData';
import {theme} from '../../constants';

import AttentionNodeTab from './AttentionNodeTab';
import AttentionDeploymapTab from './AttentionDeploymapTab';

class AttentionPage extends Component {
  componentDidMount() {
    this.fetch();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentProject !== this.props.currentProject) {
      this.fetch(newProps.currentProject.id);
    }
  }

  fetch = id => {
    const {currentProject} = this.props;

    //刷新区域网格
    this.deploymapOnRefresh({
      project_id: id ? id : currentProject.id,
    });

    //刷新监测点
    this.nodeOnRefresh({
      project_id: id ? id : currentProject.id,
    });
  };

  //监测点刷新
  nodeOnRefresh = payload => {
    this.nodeTab.swipeView.onRefresh(() => {
      return this.fetchNode(payload);
    });
  };

  fetchNode = payload => {
    const {dispatch, currentProject} = this.props;
    return dispatch({
      type: 'attentionNode/list',
      payload: {
        project_id: currentProject.id,
        page: 1,
        ...payload,
      },
    });
  };

  //监测点取消关注
  callDeleteNode = id => {
    const {dispatch} = this.props;
    return dispatch({
      type: 'attentionNode/remove',
      payload: {
        ids: [id],
      },
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
      type: 'attentionDeploymap/list',
      payload: {
        project_id: currentProject.id,
        page: 1,
        ...payload,
      },
    });
  };

  //网格取消关注
  callDeleteDeploymap = id => {
    const {dispatch} = this.props;
    return dispatch({
      type: 'attentionDeploymap/remove',
      payload: {
        ids: [id],
      },
    });
  };

  render() {
    const {
      deploymapList,
      deploymapPagination,
      nodeList,
      nodePagination,
    } = this.props;

    const tabsConfig = [
      {
        title: '网格',
        tabContainer: (
          <AttentionDeploymapTab
            ref={deploymapTab => (this.deploymapTab = deploymapTab)}
            pagination={deploymapPagination}
            data={deploymapList}
            callLoadData={payload => {
              return this.fetchDeploymap(payload);
            }}
            callDelete={this.callDeleteDeploymap}
          />
        ),
      },
      {
        title: '监测点',
        tabContainer: (
          <AttentionNodeTab
            ref={nodeTab => (this.nodeTab = nodeTab)}
            pagination={nodePagination}
            data={nodeList}
            callLoadData={payload => {
              return this.fetchNode(payload);
            }}
            callDelete={this.callDeleteNode}
          />
        ),
      },
    ];
    return (
      <Container color="bule" imageBackground={false}>
        {/* 头部 */}
        <Header
          noColor
          leftIcon={['message']}
          rightIcon={['menu']}
          dispatch={this.props.dispatch}
        />
        <Content>
          {/* 项目选择框 */}
          <PickerProject componentType="icon" margin={[10, 0, 0, 0]} />
          <Tabs
            tabsConfig={tabsConfig}
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
            }}
            tabBarRadius={20}
            tabBarBorder={1}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(({init, attentionDeploymap, attentionNode}) => ({
  currentProject: init.currentProject,
  deploymapList: attentionDeploymap.pagedList,
  deploymapPagination: attentionDeploymap.pagination,
  nodeList: attentionNode.pagedList,
  nodePagination: attentionNode.pagination,
}))(AttentionPage);
