import React, {Component} from 'react';

import {
  Block,
  FilterButton,
  FilterText,
  Content,
  ContentFooter,
} from '../../components/common';
import SwipeView from '../../components/common/SwipeView';
import NodeBox from '../../components/NodeBox';

export default class DangerNodeTab extends Component {
  render() {
    const {filter, filterOnPress} = this.props;
    return (
      <Content>
        <Block flex={false} right row margin={[15, 20]}>
          {filter.map(item => (
            <FilterText title={item.id > 0 && item.name ? item.name : ''} />
          ))}
          <FilterButton onPress={filterOnPress} />
        </Block>
        <SwipeView
          ref={swipeView => (this.swipeView = swipeView)}
          isRefresh={true}
          isLoading={true}
          {...this.props}
          renderItem={({item}, rowMap) => {
            return <NodeBox key={item.id} nodeData={item} />;
          }}
        />
        <ContentFooter />
      </Content>
    );
  }
}
