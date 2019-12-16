import React, {Component} from 'react';

import {theme} from '../constants';
import {Block, Text, Icon} from './common';

export class DepButton extends Component {
  render() {
    const {type, title} = this.props;

    return type === 'linkman' ? (
      <Block
        touchableOpacity
        flex={false}
        row
        center
        middle
        color={'bule'}
        margin={[10, 0, 0, 0]}
        width={140}
        style={{
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
        }}
        onPress={() => {}}>
        <Icon
          image
          name={require('../assets/img/linkman1.png')}
          size={theme.sizes.content}
        />
        <Text
          style={{maxWidth: 80}}
          padding={[5, 5]}
          content
          color={'white'}
          center>
          {title && title.name ? title.name : '暂无'}
        </Text>
        {title && title.name ? (
          <Icon image name={require('../assets/img/phone.png')} size={20} />
        ) : null}
      </Block>
    ) : (
      <Block
        touchableOpacity
        flex={false}
        color={'white'}
        borderRadius={50}
        margin={[10, 0, 0, 0]}
        width={120}
        {...this.props}>
        <Text padding={[5, 0]} content color={'gray'} center>
          {title ? title : ''}
        </Text>
      </Block>
    );
  }
}
