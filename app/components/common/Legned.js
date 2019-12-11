import React, {Component} from 'react';
import Block from './Block';
import Text from './Text';
import {theme} from '../../constants';

export class Legned extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {height, width, style, number} = this.props;
    return (
      <Block
        flex={false}
        height={height ? height : 20}
        width={width ? width : 20}
        color={theme.colors.red}
        borderRadius={50}
        center
        middle
        absolute
        style={[{left: 0, top: -10}, style]}>
        <Text caption numberOfLines={0} size={10} color={theme.colors.white}>
          {number && number >= 0 ? (number >= 100 ? '99+' : number) : '0'}
        </Text>
      </Block>
    );
  }
}

export class MinLegned extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {size, color, margin, style} = this.props;
    return (
      <Block
        flex={false}
        height={size ? size : 12}
        width={size ? size : 12}
        color={color ? color : theme.colors.bule}
        borderRadius={50}
        margin={margin ? margin : [0, 5]}
        center
        middle
        style={style}
      />
    );
  }
}
