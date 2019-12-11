/**
 * 安全评分雷达图
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Echarts from 'native-echarts';

import {Block} from '../common';

class SafetyPointRadar extends Component {
  render() {
    const {data} = this.props;
    const option = {
      // tooltip: {show: true},//是否显示浮动框看数据
      radar: {
        name: {
          show: true,
          //   color: '#fff',
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        shape: 'circle',
        splitArea: {
          areaStyle: {
            color: ['rgba(255, 255, 255, 0)'],
          },
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.4)',
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.2)',
          },
        },

        indicator: [
          {name: '安全评分(' + data[0] + ')', max: 100},
          {name: '整改态度(' + data[1] + ')', max: 100},
          {name: '反应速度(' + data[2] + ')', max: 100},
          {name: '巡查得分(' + data[3] + ')', max: 100},
        ],
      },
      series: [
        {
          name: '评分',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: data,
              name: '评分',
              symbol: 'none',
              areaStyle: {
                normal: {
                  opacity: 0.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                },
              },
              lineStyle: {
                normal: {
                  // type: "dashed",
                  color: 'rgba(255, 255, 255, 0.6)',
                },
              },
            },
          ],
        },
      ],
    };
    return (
      <Block center middle {...this.props}>
        <Echarts option={option} height={230} data={this.props.data} />
        <Block
          touchableOpacity
          absolute
          style={{height: '70%', width: '50%'}}
          onPress={this.props.onPress}
        />
      </Block>
    );
  }
}
export default connect(({countProject}) => ({
  data: countProject.projectSafetyPoint,
}))(SafetyPointRadar);
