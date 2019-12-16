import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {alertLevels} from '../../../constants/status';
import {theme} from '../../../constants';
import {Container, Header, Block, Text, Tabs} from '../../../components/common';
import {NodeButton} from '../../../components/NodeButton';
import RealTimeTab from './RealTimeTab';
import HistoryTab from './HistoryTab';
import AnalysTab from './AnalysTab';

class NodeDetailPage extends Component {
  componentDidMount() {
    const {dispatch, params} = this.props;
    if (params && params.id) {
      this.fetchDetail().then(_ => {
        // this.fetch(params.id);
      });
    }
  }

  fetchDetail = () => {
    const {params} = this.props;
    return this.props.dispatch({
      type: 'node/detail',
      payload: {
        id: params.id,
      },
    });
  };

  removeAttention = () => {
    const {currentItem, dispatch} = this.props;
    if (currentItem && currentItem.id && currentItem.attention) {
      dispatch({
        type: 'attentionNode/remove',
        payload: {
          ids: [currentItem.attention],
        },
      }).then(v => {
        this.fetchDetail();
      });
    }
  };
  addAttention = () => {
    const {currentItem, dispatch} = this.props;
    if (currentItem && currentItem.id) {
      dispatch({
        type: 'attentionNode/create',
        payload: {
          project_id: currentItem.project ? currentItem.project.id : '',
          deploymap_id: currentItem.deploymap ? currentItem.deploymap.id : '',
          node_id: currentItem.id,
        },
      }).then(v => {
        this.fetchDetail();
      });
    }
  };

  render() {
    const {currentItem} = this.props;
    let category =
      currentItem && currentItem.p_code ? currentItem.p_code.split(',') : [];

    return (
      <Container color={`alertColor${currentItem.alert_level}`}>
        {/* 头部 */}
        <Header
          noColor
          leftIcon={['goback']}
          rightIcon={['']}
          dispatch={this.props.dispatch}
        />

        <Block flex={false} margin={[0, 20]}>
          <Block flex={false} row space="between" margin={[10, 0, 0, 0]}>
            <Block flex={false} middle>
              <Text h4 semibold lineHeight={90} color={`white`}>
                {Math.round(currentItem.safety_point || 0)}
              </Text>
            </Block>

            <Block flex={0.8} row right>
              <Block flex={false}>
                <NodeButton
                  title={currentItem.name}
                  image={require('../../../assets/img/n2.png')}
                />
                <Block flex={false} row right>
                  {category
                    ? category.map((v, i) => {
                        return v === '1001' ? (
                          <NodeButton
                            key={i}
                            title={'能耗管理'}
                            image={require('../../../assets/img/n5.png')}
                          />
                        ) : v === '1002' ? (
                          <NodeButton
                            key={i}
                            title={'电气安全'}
                            image={require('../../../assets/img/n3.png')}
                          />
                        ) : v === '1003' ? (
                          <NodeButton
                            key={i}
                            title={'烟雾火灾'}
                            image={require('../../../assets/img/n6.png')}
                          />
                        ) : null;
                      })
                    : null}
                </Block>
                <NodeButton
                  title={
                    alertLevels[currentItem.alert_level] &&
                    alertLevels[currentItem.alert_level].name
                      ? alertLevels[currentItem.alert_level].name
                      : ''
                  }
                  image={require('../../../assets/img/n4.png')}
                />
                <NodeButton
                  title={'刘翔'}
                  image={require('../../../assets/img/n1.png')}
                />

                <Block flex={false} row right>
                  {currentItem.attention && currentItem.attention > 0 ? (
                    <NodeButton
                      type="button"
                      title={'取消关注'}
                      onPress={this.removeAttention}
                    />
                  ) : (
                    <NodeButton
                      type="button"
                      title={'关注'}
                      onPress={this.addAttention}
                    />
                  )}

                  <NodeButton type="button" title={'联系负责人'} />
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>

        <Block color={theme.colors.gray_} margin={[20, 0, 0, 0]}>
          <Text>监测点详情</Text>
        </Block>
      </Container>
    );
  }
}

export default connect(({init, node}) => ({
  currentProject: init.currentProject,
  currentItem: node.currentItem,
}))(NodeDetailPage);
