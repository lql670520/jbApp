import React, {Component} from 'react';
import Block from './Block';
import Icon from './Icon';
import Text from './Text';

export default class NoData extends Component {
  render() {
    return (
      <Block
        center
        middle
        color="#fff"
        padding={this.props.padding ? this.props.padding : [10, 0]}>
        <Icon image name={require('../../assets/img/doData.png')} size={120} />
        <Text margin={[10, 0, 0, 0]}>暂无数据</Text>
      </Block>
    );
  }
}
