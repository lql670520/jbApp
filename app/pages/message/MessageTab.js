import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';

import {
  Block,
  FilterButton,
  FilterText,
  Content,
  Text,
} from '../../components/common';
import SwipeView from '../../components/common/SwipeView';
import DeploymapBox from '../../components/DeploymapBox';

export default class MessageTab extends Component {
  render() {
    const {filter, filterOnPress} = this.props;
    return (
      <Content>
        {/* <Block flex={false} right row margin={[15, 20]}>
          {filter.map(item => (
            <FilterText title={item.id > 0 && item.name ? item.name : ''} />
          ))}
          <FilterButton onPress={filterOnPress} />
        </Block> */}
        <SwipeView
          ref={swipeView => (this.swipeView = swipeView)}
          isRefresh={true}
          isLoading={true}
          {...this.props}
          renderItem={({item}, rowMap) => {
            return (
              <Block
                flex={false}
                padding={[10]}
                margin={this.props.margin ? this.props.margin : [10, 0, 0, 0]}
                card
                color="white">
                <Block flex={false} row padding={[10, 0]}>
                  <Text numberOfLines={0}>{item.content ? item.content : ''}</Text>
                </Block>
                <Block flex={false} row padding={[0, 20, 0, 0]}>
                  <Text gray content>
                    {item.crtime ? item.crtime : ''}
                  </Text>
                </Block>
              </Block>
            );
          }}
        />
      </Content>
    );
  }
}
