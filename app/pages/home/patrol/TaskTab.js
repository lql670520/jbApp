import React, {Component} from 'react';
import {
  Block,
  Text,
  MinLegned,
  FilterButton,
  FilterText,
} from '../../../components/common';
import SwipeView from '../../../components/common/SwipeView';
import {taskStatus} from '../../../constants/status';

export default class TaskTab extends Component {
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
                    <Text>{item.title}</Text>
                  </Block>
                  <Block flex={0.4} row center right>
                    {item.status &&
                    taskStatus[item.status] &&
                    taskStatus[item.status].color ? (
                      <MinLegned color={taskStatus[item.status].color} />
                    ) : null}

                    <Text>
                      {item.status && taskStatus[item.status]
                        ? taskStatus[item.status].name
                          ? taskStatus[item.status].name
                          : ''
                        : ''}
                    </Text>
                  </Block>
                </Block>
                <Block row center>
                  <Text gray content>
                    {item.time ? item.time : ''}
                  </Text>
                </Block>
                <Block flex={false} row right>
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

                  <Block
                    touchableOpacity
                    flex={false}
                    color={'bule'}
                    borderRadius={50}
                    margin={[0, 0, 0, 5]}
                    onPress={() => {
                      this.setState({taskList: {}});
                    }}>
                    <Text padding={[5, 25]} content color={'white'} center>
                      整改
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
