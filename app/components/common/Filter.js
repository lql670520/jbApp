import React, {Component} from 'react';
import Block from './Block';
import Text from './Text';
import Icon from './Icon';

export class FilterButton extends Component {
  render() {
    return (
      <Block
        flex={false}
        row
        center
        touchableOpacity
        onPress={this.props.onPress}>
        <Text content margin={[0, 3, 0, 0]}>
          筛选
        </Text>
        <Icon image name={require('../../assets/img/down.png')} size={12} />
      </Block>
    );
  }
}

export class FilterText extends Component {
  render() {
    return this.props.title ? (
      <Block
        flex={false}
        color={'gray_'}
        borderRadius={50}
        margin={[0, 5, 0, 0]}>
        <Text content padding={[5, 10]}>
          {this.props.title ? this.props.title : ''}
        </Text>
      </Block>
    ) : null;
  }
}
