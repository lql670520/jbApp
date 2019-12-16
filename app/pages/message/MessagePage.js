import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Content, Header, Block} from '../../components/common';
import PickerProject from '../../components/PickerProject';
import {theme} from '../../constants';

import MessageTab from './MessageTab';

class MessagePage extends Component {
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
    this.messageOnRefresh({
      project_id: id ? id : currentProject.id,
    });
  };

  //消息刷新
  messageOnRefresh = payload => {
    this.messageTab.swipeView.onRefresh(() => {
      return this.fetchMessage(payload);
    });
  };

  fetchMessage = payload => {
    const {dispatch, currentProject} = this.props;
    return dispatch({
      type: 'message/list',
      payload: {
        project_id: currentProject.id,
        page: 1,
        ...payload,
      },
    });
  };

  render() {
    const {messageList, messagePagination} = this.props;

    return (
      <Container color="bule" imageBackground={false}>
        {/* 头部 */}
        <Header
          title="消息"
          noColor
          leftIcon={['goback']}
          rightIcon={['']}
          dispatch={this.props.dispatch}
        />
        <Content>
          {/* 项目选择框 */}
          <PickerProject componentType="icon" margin={[10, 0, 0, 0]} />
          <Block color={theme.colors.gray_} margin={[20, 0, 0, 0]}>
            <MessageTab
              ref={messageTab => (this.messageTab = messageTab)}
              pagination={messagePagination}
              data={messageList}
              callLoadData={payload => {
                return this.fetchMessage(payload);
              }}
            />
          </Block>
        </Content>
      </Container>
    );
  }
}

export default connect(({init, message}) => ({
  currentProject: init.currentProject,
  messageList: message.pagedList,
  messagePagination: message.pagination,
}))(MessagePage);
