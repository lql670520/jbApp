import React, {Component} from 'react';
import {
  Block,
  Text,
  MinLegned,
  FilterButton,
  FilterText,
} from '../../../components/common';
import SwipeView from '../../../components/common/SwipeView';
import {todoAssessStatus as statusMap} from '../../../constants/status';

export default class TodoAssessTab extends Component {
  render() {
    const {filter, filterOnPress} = this.props;
    return (
      <Block>
        <Block flex={false} right row margin={[0, 10, 10, 10]}>
          <FilterText
            title={filter && filter.id > 0 && filter.name ? filter.name : ''}
          />
          <FilterButton onPress={filterOnPress} />
        </Block>
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
                margin={[0, 0, 10, 0]}
                card
                color="white">
                <Block flex={false} row space={'between'}>
                  <Block flex={0.55} padding={[5, 0]}>
                    <Text>
                      {item.node && item.node.name ? item.node.name : ''}
                    </Text>
                  </Block>
                  <Block flex={0.4} row center right>
                    {item.status &&
                    statusMap[item.status] &&
                    statusMap[item.status].color ? (
                      <MinLegned color={statusMap[item.status].color} />
                    ) : null}

                    <Text>
                      {item.status && statusMap[item.status]
                        ? statusMap[item.status].name
                          ? statusMap[item.status].name
                          : ''
                        : ''}
                    </Text>
                  </Block>
                </Block>

                <Block row center>
                  <Text gray content>
                    {item.deploymap && item.deploymap.name
                      ? item.deploymap.name
                      : ''}
                  </Text>
                </Block>

                <Block flex={false} row right>
                  <Block row center>
                    <Text gray content>
                      开始时间:{item.crtime ? item.crtime : ''}
                    </Text>
                  </Block>
                  <Block
                    touchableOpacity
                    flex={false}
                    border={1}
                    borderColor={'bule'}
                    borderRadius={50}>
                    <Text padding={[5, 10]} content color={'bule'} center>
                      查看报告
                    </Text>
                  </Block>
                </Block>
              </Block>
            );
          }}
        />
      </Block>
    );
  }
}
