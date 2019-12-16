import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Content, Header, Block, Text} from '../../components/common';

class PasswordPage extends Component {
  render() {
    return (
      <Container color="bule" imageBackground={false}>
        {/* 头部 */}
        <Header
          noColor
          leftIcon={['goback']}
          rightIcon={['']}
          dispatch={this.props.dispatch}
          title="设置密码"
        />
        <Content>
          <Block color="gray_" margin={[20, 0, 0, 0]}>
            <Text>修改密码</Text>
          </Block>
        </Content>
      </Container>
    );
  }
}

export default connect(({init, message}) => ({
  currentProject: init.currentProject,
}))(PasswordPage);
