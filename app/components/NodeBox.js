import React, {Component} from 'react';

import {Block, Text, Icon, MinLegned} from './common';
import {theme} from '../constants';
import {alertLevels} from '../constants/status';

export default class NodeBox extends Component {
  render() {
    const {nodeData} = this.props;
    const alertLevel =
      nodeData && nodeData.alert_level ? nodeData.alert_level : 1;
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
        <Block row padding={[5, 10, 10, 10]}>
          <Block
            flex={0.9}
            margin={[0, 5]}
            border={[0, 1, 0, 0]}
            borderColor={theme.colors.gray_}>
            <Block row center height={50}>
              <Text>{nodeData.name ? nodeData.name : ''}</Text>
            </Block>
            <Block row center margin={[5, 0, 0, 0]}>
              <Block row>
                <Block
                  flex={false}
                  color={'#D1E5FE'}
                  padding={[0, 3]}
                  margin={[0, 3, 0, 0]}
                  card>
                  <Text content gray>
                    住宅
                  </Text>
                </Block>
                {nodeData.category
                  ? nodeData.category.map((v, i) => {
                      return (
                        <Block flex={false} row margin={[0, 3, 0, 0]} center>
                          {v.code === '1001' ? (
                            <Icon
                              image
                              size={theme.sizes.content}
                              name={require('../assets/img/c1001.png')}
                            />
                          ) : v.code === '1002' ? (
                            <Icon
                              image
                              size={theme.sizes.content}
                              name={require('../assets/img/c1002.png')}
                            />
                          ) : v.code === '1003' ? (
                            <Icon
                              image
                              size={theme.sizes.content}
                              name={require('../assets/img/c1003.png')}
                            />
                          ) : null}
                          <Text content gray margin={[0, 0, 0, 2]}>
                            {v.name}
                          </Text>
                        </Block>
                      );
                    })
                  : null}
              </Block>
            </Block>
          </Block>

          <Block flex={0.5} margin={[0, 5]}>
            <Block flex={false} row center height={50}>
              <Text semibold size={35} color={`alertColor${alertLevel}`}>
                {Math.round((nodeData && nodeData.safety_point) || 0)}
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

            <Text content gray margin={[5, 0, 0, 0]}>
              {nodeData.node_analyse ? nodeData.node_analyse : ''}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  }
}
