/**
 * 导航tab里的box
 */
import React, {Component} from 'react';
import {Block, Text} from './common';
import {theme} from '../constants';

export default class DevicesTabBox extends Component {
  render() {
    const {count, name, tabLength} = this.props;
    const length = tabLength ? tabLength : 3;
    return (
      <Block
        center
        middle
        width={(theme.deviceInfo.width * 0.9) / length}
        border={[0, 0, 0, 1]}
        margin={[10, 0]}
        borderColor={theme.colors.gray_}>
        <Text h5 center>
          {count ? count : null}
        </Text>
        <Text body gray center>
          {name ? name : null}
        </Text>
      </Block>
    );
  }
}
