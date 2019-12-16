import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {
  Container,
  Content,
  Header,
  Block,
  Text,
} from '../../../components/common';
import SafetyTrend from '../../../components/echarts/SafetyTrend';
import {
  WarnTrendEvent,
  WarnTrendNode,
} from '../../../components/echarts/WarnTrend';
import PieNode from '../../../components/echarts/PieNode';
import PieDay from '../../../components/echarts/PieDay';

class Card extends PureComponent {
  render() {
    const {
      noTitleLine,
      title,
      content,
      titleComponent,
      contentComponent,
    } = this.props;
    const line = noTitleLine
      ? {}
      : {border: [0, 0, 1, 0], borderColor: 'gray_bg'};
    return (
      <Block flex={false} color="white" margin={[0, 0, 10, 0]} {...this.props}>
        <Block flex={false}>
          <Block flex={false} {...line}>
            <Block flex={false} padding={[10, 15]}>
              {titleComponent ? titleComponent : <Text title>{title}</Text>}
            </Block>
          </Block>

          <Block flex={false} margin={noTitleLine ? [0, 15, 10, 15] : [10, 15]}>
            {contentComponent ? (
              contentComponent
            ) : (
              <Text content numberOfLines={0}>
                {content}
              </Text>
            )}
          </Block>
        </Block>
      </Block>
    );
  }
}
class SafetyReportDetailPage extends PureComponent {
  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const {dispatch, params} = this.props;
    if (params && params.id) {
      dispatch({
        type: 'safetyReport/detail',
        payload: {
          id: params.id,
        },
      }).then(_ => {
        dispatch({
          type: 'safetyReport/analyse',
          payload: {
            id: params.id,
          },
        });
      });
    }
  };

  render() {
    const {currentItem, analyseData} = this.props;

    return (
      <Container color="bule" imageBackground={false}>
        {/* 头部 */}
        <Header
          title="安全报告详情"
          noColor
          leftIcon={['goback']}
          rightIcon={['']}
          dispatch={this.props.dispatch}
        />
        <Content scrollView>
          <Block>
            {/* 标题 */}
            <Card
              noTitleLine
              titleComponent={
                <Text title numberOfLines={0} center>
                  南台新苑紫荆园机房安全报告(2019-11-12至2019-11-27)
                </Text>
              }
              contentComponent={
                <Text gray content center>
                  编号:RJY119-119000002
                </Text>
              }
            />
            {/* 评估对象和依据 */}
            <Card
              title={'评估对象和依据'}
              content={`本次报告针对【南台新苑紫荆园机房】项目,评估依据【2019-11-12 ~ 2019-11-27】产生的安全相关数据。`}
            />
            {/* 评估对象和依据 */}
            <Card
              title={'监测点安全分布'}
              contentComponent={
                <Block>
                  <PieNode data={data.pieNode} />
                </Block>
              }
            />
            <Card
              title={'时间安全分布'}
              contentComponent={
                <Block>
                  <PieDay data={data.pieDays} />
                </Block>
              }
            />
            {/* 安全趋势 */}
            <Card
              title={'安全趋势'}
              contentComponent={
                <Block flex={false} height={270}>
                  <SafetyTrend margin={[30, 0]} data={data.trend} />
                </Block>
              }
            />
            {/* 预计事件 */}
            <Card
              title={'预计事件'}
              contentComponent={
                <Block flex={false}>
                  <WarnTrendEvent data={data.safety_event} />
                  <WarnTrendNode
                    margin={[0, 0, 50, 0]}
                    data={data.safety_event}
                  />
                </Block>
              }
            />
            <Card
              title={'主要发现'}
              content={`本次报告总共统计【4】个安全预警监测点， 【16】天，【384】个监测点时段的数据。 总共发现报警天数【5】天， 报警监测点时段【7】个； 严重隐患天数【2】天， 严重隐患监测点时段【6】个； 一般隐患天数【9】天， 一般隐患监测点时段【215】个。 发现报警点【2】个，严重隐患点【0】个， 一般隐患点【0】个， 其中需要重点排查的监测点【2】个。 累计发现预警监测点【2】个，发生预警事件【71】次。`}
            />
          </Block>
        </Content>
      </Container>
    );
  }
}

const data = {
  analyse: {
    alertDays: '5',
    alertNodes: '2',
    alertTimes: '7',
    dayCount: '16',
    eventAmount: '71',
    eventNodes: '2',
    nodeCount: '4',
    seriousDays: '2',
    seriousNodes: '0',
    seriousTimes: '6',
    timeCount: '384',
    warnDays: '9',
    warnNodes: '0',
    warnTimes: '215',
  },
  calendar: [
    {date: '2019-11-12', value: '60.8'},
    {date: '2019-11-13', value: '84'},
    {date: '2019-11-14', value: '36.9'},
    {date: '2019-11-15', value: '84'},
    {date: '2019-11-16', value: '84'},
    {date: '2019-11-17', value: '84.1'},
    {date: '2019-11-18', value: '84.1'},
    {date: '2019-11-19', value: '84.1'},
    {date: '2019-11-20', value: '84.1'},
    {date: '2019-11-21', value: '27.2'},
    {date: '2019-11-22', value: '84.1'},
    {date: '2019-11-23', value: '52'},
    {date: '2019-11-24', value: '42.4'},
    {date: '2019-11-25', value: '84.1'},
    {date: '2019-11-26', value: '62.4'},
    {date: '2019-11-27', value: '30'},
  ],
  pieDays: ['0', '9', '2', '5'],
  pieNode: ['2', '3', '8', '2'],
  safety_event: {
    event: [
      {
        name: '一般隐患',
        value: [
          '0',
          '0',
          '1',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
        ],
        weight: '1',
      },
      {
        name: '严重隐患',
        value: [
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
        ],
        weight: '2',
      },
      {
        name: '告警',
        value: [
          '12',
          '0',
          '4',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '4',
          '0',
          '8',
          '8',
          '0',
          '4',
          '12',
        ],
        weight: '3',
      },
      {
        name: '紧急事件',
        value: [
          '2',
          '0',
          '2',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '2',
          '0',
          '4',
          '4',
          '0',
          '0',
          '4',
        ],
        weight: '4',
      },
    ],
    event_amount: '71',
    node: [
      {
        name: '监测点数',
        value: [
          '2',
          '0',
          '2',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '2',
          '0',
          '2',
          '2',
          '0',
          '2',
          '2',
        ],
      },
    ],
    node_amount: '2',
    time: [
      '2019-11-12',
      '2019-11-13',
      '2019-11-14',
      '2019-11-15',
      '2019-11-16',
      '2019-11-17',
      '2019-11-18',
      '2019-11-19',
      '2019-11-20',
      '2019-11-21',
      '2019-11-22',
      '2019-11-23',
      '2019-11-24',
      '2019-11-25',
      '2019-11-26',
      '2019-11-27',
    ],
  },
  trend: {
    data: [
      {
        name: '安全评分',
        value: [
          '60.8',
          '84',
          '36.9',
          '84',
          '84',
          '84.1',
          '84.1',
          '84.1',
          '84.1',
          '27.2',
          '84.1',
          '52',
          '42.4',
          '84.1',
          '62.4',
          '30',
        ],
      },
    ],
    time: [
      '2019-11-12',
      '2019-11-13',
      '2019-11-14',
      '2019-11-15',
      '2019-11-16',
      '2019-11-17',
      '2019-11-18',
      '2019-11-19',
      '2019-11-20',
      '2019-11-21',
      '2019-11-22',
      '2019-11-23',
      '2019-11-24',
      '2019-11-25',
      '2019-11-26',
      '2019-11-27',
    ],
  },
};

export default connect(({safetyReport}) => ({
  analyseData: safetyReport.analyseData,
  currentItem: safetyReport.currentItem,
}))(SafetyReportDetailPage);
