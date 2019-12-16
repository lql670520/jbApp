import React, {PureComponent} from 'react';
import Block from './Block';
import Text from './Text';

export class SwipeBox extends PureComponent {
  render() {
    return (
      <Block row overflow="hidden" {...this.props}>
        <Block row right>
          {this.props.children}
        </Block>
      </Block>
    );
  }
}

export class SwipeButton extends PureComponent {
  render() {
    const {title, width, textColor} = this.props;
    return (
      <Block
        width={width ? width : 75}
        flex={false}
        touchableOpacity
        row
        color="red"
        middle
        center
        {...this.props}>
        <Text center content color={textColor ? textColor : 'white'}>
          {title}
        </Text>
      </Block>
    );
  }
}
