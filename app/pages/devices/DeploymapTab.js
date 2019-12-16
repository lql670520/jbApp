import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';

import {
  Block,
  FilterButton,
  FilterText,
  Content,
  ContentFooter,
} from '../../components/common';
import SwipeView from '../../components/common/SwipeView';
import DeploymapBox from '../../components/DeploymapBox';

export default class DeploymapTab extends Component {
  render() {
    const {filter, filterOnPress , sub} = this.props;
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
            return (
              <DeploymapBox
                key={item.id}
                deploymapData={item}
                onPress={() => {
                  if(sub){
                    Actions.deploymapSubDetailPage({params: {id: item.id}});
                  }else{
                    Actions.deploymapDetailPage({params: {id: item.id}});
                  }
                  
                }}
              />
            );
          }}
        />
        <ContentFooter />
      </Content>
    );
  }
}
