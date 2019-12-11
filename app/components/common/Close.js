import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import Block from './Block';
import Icon from './Icon';

export default class Close extends Component {
  render() {
    return (
      <Block
        flex={false}
        row
        right
        touchableOpacity
        onPress={() => {
          Actions.pop();
        }}>
        <Block flex={false} margin={[20, 20, 0, 0]}>
          <Icon image name={require('../../assets/img/close.png')} size={20} />
        </Block>
      </Block>
    );
  }
}
