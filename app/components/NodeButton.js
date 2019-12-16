import React, {Component} from 'react';

import {theme} from '../constants';
import {Block, Text, Icon} from './common';

export class NodeButton extends Component {
  render() {
    const {type, title, image, margin} = this.props;

    return type === 'button' ? (
      <Block
        touchableOpacity
        flex={false}
        borderRadius={50}
        padding={[5, 15]}
        margin={margin ? margin : [0, 0, 0, 5]}
        color={'rgba(255,255,255,0.5)'} {...this.props}>
        <Text content color={'white'} center>
          {title && title ? title : ''}
        </Text>
      </Block>
    ) : (
      <Block flex={false} row right margin={margin ? margin : [0, 0, 5, 0]}>
        <Block touchableOpacity flex={false} borderRadius={50} row center>
          <Text margin={[0, 5]} content color={'white'} center>
            {title && title ? title : ''}
          </Text>
          <Icon image name={image} size={18} />
        </Block>
      </Block>
    );
  }
}
