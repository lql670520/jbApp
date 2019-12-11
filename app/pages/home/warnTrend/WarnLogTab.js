import React, {Component} from 'react';
import {Block, Text, Icon} from '../../../components/common';
import SwipeView from '../../../components/common/SwipeView';

export default class WarnLogTab extends Component {
  render() {
    return (
      <SwipeView
        ref={swipeView => (this.swipeView = swipeView)}
        isRefresh={true}
        isLoading={true}
        {...this.props}
        renderItem={({item}, rowMap) => {
          let alertLevel = Number(item.safety_event.weight) + 1;
          if (alertLevel > 4) {
            alertLevel = 4;
          }

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
                  <Text gray content>
                    {item.crtime ? item.crtime : ''}
                  </Text>
                </Block>
              </Block>
              <Block row center>
                {/* <Icon
                  image
                  size={12}
                  name={require(`../../../assets/img/alert${alertLevel}.png`)}
                />
                上面动态加载不行，只能静态加载
                */}
                {alertLevel === 1 ? (
                  <Icon
                    image
                    size={12}
                    name={require('../../../assets/img/alert1.png')}
                  />
                ) : alertLevel === 2 ? (
                  <Icon
                    image
                    size={12}
                    name={require('../../../assets/img/alert2.png')}
                  />
                ) : alertLevel === 3 ? (
                  <Icon
                    image
                    size={12}
                    name={require('../../../assets/img/alert3.png')}
                  />
                ) : alertLevel === 4 ? (
                  <Icon
                    image
                    size={12}
                    name={require('../../../assets/img/alert4.png')}
                  />
                ) : null}
                <Text gray content margin={(0, 0, 0, 5)}>
                  {item.safety_event && item.safety_event.name
                    ? item.safety_event.name
                    : ''}
                </Text>
              </Block>
              <Block flex={false} row>
                <Block flex={false} margin={[0, 10, 0, 0]}>
                  <Text gray content>
                    数值:{item.value ? item.value : ''}
                  </Text>
                </Block>
                <Text gray content>
                  超标:
                  {item.safety_event && item.safety_event.over_times
                    ? item.safety_event.over_times
                    : ''}
                  倍
                </Text>
              </Block>
            </Block>
          );
        }}
      />
    );
  }
}
