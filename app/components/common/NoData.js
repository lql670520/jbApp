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
        margin={this.props.margin ? this.props.margin : [0, 10]}
        padding={this.props.padding ? this.props.padding : [10, 0]}>
        <Icon image name={require('../../assets/img/doData.png')} size={120} />
        <Text margin={[10, 10, 10, 10]}>暂无数据</Text>
      </Block>
    );
  }
}
