import React, {Component} from 'react';

import {alertLevels} from '../constants/status';
import {Block, Text, Icon} from '../components/common';

export default class SafetyPoint extends Component {
  render() {
    const {alertLevel, safetyPoint} = this.props;
    return (
      <Block flex={false} {...this.props}>
        <Text
          center
          middle
          h4
          semibold
          lineHeight={90}
          color={`alertColor${alertLevel}`}>
          {safetyPoint}
        </Text>
        <Block flex={false} row center middle margin={[-10, 0, 0, 0]}>
          {alertLevel == '1' ? (
            <Icon
              image
              name={require('../assets/img/alert1_1.png')}
              size={20}
              style={{marginRight: 5}}
            />
          ) : alertLevel == '4' ? (
            <Icon
              image
              name={require('../assets/img/alert4.png')}
              size={20}
              style={{marginRight: 5}}
            />
          ) : null}

          <Text center color={`alertColor${alertLevel}`}>
            {alertLevels[alertLevel] && alertLevels[alertLevel].name
              ? alertLevels[alertLevel].name
              : ''}
          </Text>
        </Block>
      </Block>
    );
  }
}
