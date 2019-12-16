/**
 * 安全评分趋势图
 */
import React, {Component} from 'react';
import Echarts from 'native-echarts';

import {Block} from '../common';
import LevelLegned from './LevelLegned';

export default class SafetyTrend extends Component {
  render() {
    let {data} = this.props;

    const markLine = {
      symbol: 'none',
      silent: false,
      data: [
        {
          name: '一般隐患',
          value: 90,
          yAxis: 90,
          lineStyle: {normal: {color: '#8E8DFB'}},
        },
        {
          name: '严重隐患',
          value: 70,
          yAxis: 70,
          lineStyle: {normal: {color: '#FFAE46'}},
        },
        {
          name: '报警',
          value: 60,
          yAxis: 60,
          lineStyle: {normal: {color: '#FF6D7B'}},
        },
      ],
    };

    const series = data.data.map(e => {
      if (data.length > 1) {
        return {
          name: e.name,
          type: e.type ? e.type : 'line',
          data: e.value,
          // stack: e.stack,
          markLine: markLine,
        };
      } else {
        return {
          name: e.name,
          type: e.type ? e.type : 'line',
          data: e.value,
          // stack: '总量',
          itemStyle: {
            normal: {
              //线的颜色
              lineStyle: {
                color: '#2399d3',
              },
              //线上的点颜色
              color: function(params) {
                const index_color = params.value;
                if (index_color < 60) {
                  return '#FF6D7B';
                } else if (index_color < 70) {
                  return '#FFAE46';
                } else if (index_color < 90) {
                  return '#8E8DFB';
                } else {
                  return '#61CD00';
                }
              },
            },
          },
          markLine: markLine,
        };
      }
    });

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          //在xy轴上的label颜色，这里无法显示
          label: {
            backgroundColor: '#6a7985',
          },
          //交叉的x线颜色
          crossStyle: {
            color: '#2399d3',
          },
          //交叉的y线颜色
          lineStyle: {
            color: '#2399d3',
          },
        },
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {show: true, type: ['line', 'bar']},
        },
      },
      legend: {
        // data: ['安全评分'],
        // show: true,
      },
      grid: {
        left: '25',
        right: '35',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: data.time,
        axisLabel: {color: 'black'},
        axisLine: {
          lineStyle: {
            // color: '#2399d3',
            // width: 8, //这里是为了突出显示加上的
          },
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        splitNumber: 10,
        splitLine: {show: true},
        axisLabel: {color: 'red'},
        axisLine: {
          lineStyle: {
            // color: '#2399d3',
            // width: 8, //这里是为了突出显示加上的
          },
        },
      },
      calculable: true,
      series: series,
    };
    const {eHeight, eMarginTop} = this.props;
    return (
      <Block flex={false} {...this.props}>
        <LevelLegned />
        <Echarts
          option={option}
          data={this.props.data}
          height={eHeight ? eHeight : 300}
          marginTop={eMarginTop ? eMarginTop : -30}
        />
      </Block>
    );
  }
}
