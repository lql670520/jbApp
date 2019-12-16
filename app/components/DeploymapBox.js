import React, {Component} from 'react';

import {Block, Text, Icon, MinLegned} from './common';
import {theme} from '../constants';
import {alertLevels} from '../constants/status';

export default class DeploymapBox extends Component {
  render() {
    const {deploymapData} = this.props;
    const alertLevel =
      deploymapData && deploymapData.alert_level
        ? deploymapData.alert_level
        : 1;
    return (
      <Block
        flex={false}
        overflow="hidden"
        card
        color={'white'}
        margin={[0, 10, 10, 10]}
        row
        touchableOpacity
        {...this.props}>
        <Block>
          <Block row padding={[5, 10, 10, 10]}>
            <Block
              flex={0.9}
              margin={[0, 5]}
              border={[0, 1, 0, 0]}
              borderColor={theme.colors.gray_}>
              <Block row center height={50}>
                <Text>{deploymapData.name ? deploymapData.name : ''}</Text>
              </Block>
              <Block row center margin={[5, 0, 0, 0]}>
                <Block row center>
                  <Icon
                    image
                    size={theme.sizes.content}
                    name={require('../assets/img/linkman.png')}
                  />
                  <Text content gray margin={[0, 5]}>
                    暂无
                  </Text>
                </Block>
              </Block>
            </Block>

            <Block flex={0.5} margin={[0, 5]} middle>
              <Block flex={false} row center>
                <Text semibold size={35} color={`alertColor${alertLevel}`}>
                  {Math.round(
                    (deploymapData && deploymapData.safety_point) || 0,
                  )}
                </Text>
                <Block flex={false} bottom height={35}>
                  <Block flex={false} row center>
                    {alertLevel == '4' ? (
                      <Icon
                        image
                        name={require('../assets/img/alert4.png')}
                        size={20}
                        style={{marginHorizontal: 5}}
                      />
                    ) : (
                      <MinLegned color={alertLevels[alertLevel].color} />
                    )}

                    <Text content gray>
                      {alertLevels[alertLevel] && alertLevels[alertLevel].name
                        ? alertLevels[alertLevel].name
                        : ''}
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
          <Block row color={theme.colors.gray_} padding={[10, 15]}>
            <Block row center>
              <Icon
                image
                size={theme.sizes.content}
                name={require('../assets/img/node.png')}
              />
              <Text content gray margin={[0, 5]}>
                监测点:{deploymapData.node_all ? deploymapData.node_all : 0}
              </Text>
            </Block>
            <Block row right center>
              <Text content gray margin={[0, 5]}>
                问题监测点:
                {deploymapData.node_alert ? deploymapData.node_alert : 0}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}
