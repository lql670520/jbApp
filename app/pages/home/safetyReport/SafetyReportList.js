import React, {Component} from 'react';
import {
  Block,
  TabContent,
  Text,
  Icon,
  Legned,
} from '../../../components/common';
import SwipeView from '../../../components/common/SwipeView';

export default class SafetyReportList extends Component {
  render() {
    return (
      <SwipeView
        ref={swipeView => (this.swipeView = swipeView)}
        isRefresh={true}
        isLoading={true}
        {...this.props}
        renderItem={({item}, rowMap) => {
          return (
            <Block
              key={item.key}
              flex={false}
              padding={[10]}
              margin={[10, 0, 0, 0]}
              card
              color="white">
              <Block flex={false} row padding={[10, 0]}>
                <Text>{item.title ? item.title : ''}</Text>
              </Block>
              <Block flex={false} row padding={[0, 20, 0, 0]}>
                <Text gray content>
                  {item.time ? item.time : ''}
                </Text>
              </Block>
            </Block>
          );
        }}
      />
    );
  }
}
