import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Keyboard} from 'react-native';

import {Container, Block, Text, Input, Button} from '../../components/common';
import {Actions} from 'react-native-router-flux';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '18558742543',
      password: '111111',
    };
  }

  _handleLogin = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'session/login',
      payload: this.state,
    });
  };

  _handleResetPassword = () => {
    Actions.passwordPage();
  };

  render() {
    return (
      <Container>
        <Block
          padding={[80, '5%', 0]}
          touchableOpacity
          onPress={() => {
            Keyboard.dismiss();
          }}>
          <Text h1 center color="primary" medium>
            欢迎登录
          </Text>

          <Block flex={false} card margin={['10%', 0]} border={1}>
            <Input
              label="账号"
              defaultValue={'18558742543'}
              onChangeText={val => {
                this.setState({account: val});
              }}
            />
            <Input
              label="密码"
              border={[0]}
              secureTextEntry={true}
              defaultValue={'111111'}
              onChangeText={val => {
                this.setState({password: val});
              }}
            />
          </Block>
          <Button semiCircle color="primary" onPress={this._handleLogin}>
            <Text bold center color="white">
              登 录
            </Text>
          </Button>

          <Block flex={false} row center middle margin={[10, 0]}>
            <Block
              flex={false}
              touchableOpacity
              onPress={this._handleResetPassword}>
              <Text center color="gray">
                忘记密码
              </Text>
            </Block>
          </Block>
        </Block>
      </Container>
    );
  }
}
export default connect()(LoginPage);
