import React, {Component} from 'react';
import {Image} from 'react-native';
import Text from './Text';
import Block from './Block';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {theme} from '../../constants';

export default class Icon extends Component {
  render() {
    const {type, size} = this.props;
    return type === 'image' ? null : (
      <Ionicons
        size={size ? size : 23}
        color={theme.colors.white}
        {...this.props}
      />
    );
  }
}

/**
 * 文本带icon控件
 */
export class TextIcon extends Component {
  render() {
    const {text, iconName, imageUri} = this.props;
    return (
      <Block
        flex={false}
        row
        center
        touchableOpacity
        color="rgba(238,240,245,.2)"
        padding={[5, 14]}
        borderRadius={15}
        {...this.props}>
        <Text gray3 center padding={[0, 3, 0, 0]}>
          {text}
        </Text>
        {imageUri ? (
          <Image style={{height: 16, width: 16}} source={imageUri} />
        ) : (
          <Icon name={iconName} size={18} color={theme.colors.gray3} />
        )}
      </Block>
    );
  }
}
