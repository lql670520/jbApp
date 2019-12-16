import React, {Component} from 'react';

import {Block, Text} from './common';

export default class SafetyReportTab extends Component {
  render() {
    const {reportData} = this.props;
    return (
      <Block
        flex={false}
        padding={[10]}
        margin={this.props.margin ? this.props.margin : [10, 0, 0, 0]}
        card
        color="white"
        touchableOpacity
        {...this.props}>
        <Block flex={false} row padding={[10, 0]}>
          <Text>{reportData.title ? reportData.title : ''}</Text>
        </Block>
        <Block flex={false} row padding={[0, 20, 0, 0]}>
          <Text gray content>
            {reportData.time ? reportData.time : ''}
          </Text>
        </Block>
      </Block>
    );
  }
}
