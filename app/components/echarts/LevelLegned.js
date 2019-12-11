import React, {Component} from 'react';

import {Block, Text} from '../common';
import {alertLevels} from '../../constants/status';

export default class LevelLegned extends Component {
  render() {
    return (
      <Block flex={false} row center middle>
        {Object.keys(alertLevels).map(i => (
          <Block key={i} flex={false} row center middle margin={[0, 6, 0, 0]}>
            <Block
              flex={false}
              height={12}
              width={12}
              margin={[0, 6, 0, 0]}
              color={alertLevels[i].color}
              card
            />
            <Text caption>{alertLevels[i].name}</Text>
          </Block>
        ))}
      </Block>
    );
  }
}
