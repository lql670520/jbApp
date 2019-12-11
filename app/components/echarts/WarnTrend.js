/**
 * 预警趋势图
 */
import React, {Component} from 'react';
import Echarts from 'native-echarts';
import {Block, Text} from '../common';

//预警事件数
export class WarnTrendEvent extends Component {
  render() {
    const {data} = this.props;
    let legendData = [];
    data.event.map((v, index) => {
      let color;
      if (v.weight === '3') {
        color = '#ff6d7b';
      } else if (v.weight === '2') {
        color = '#ffae46';
      } else if (v.weight === '1') {
        color = '#8e8dfb';
      } else {
        color = 'red';
      }

      v.type = 'bar';
      v.stack = '总量';
      v.label = {
        normal: {
          // show: true,
          // position: 'insideRight',
        },
      };
      v.itemStyle = {
        // emphasis: {
        //   barBorderRadius: 7,
        // },
        normal: {
          color: color,
          barBorderRadius: 7,
        },
      };
      v.data = v.value;

      legendData.push(v.name);
    });

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'filter',
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'filter',
        },
      ],
      legend: {
        data: legendData,
      },
      grid: {
        left: '3%',
        right: '7%',
        bottom: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.time,
      },
      yAxis: {
        type: 'value',
      },
      series: data.event,
    };
    return (
      // <View style={[s.box, this.props.style]}>
      <Block flex={false} {...this.props}>
        <Block flex={false} margin={[25, 0]}>
          <Text center>日预警事件数</Text>
        </Block>
        <Echarts option={option} height={260} data={this.props.data} />
      </Block>
    );
  }
}

//预警监测点数
export class WarnTrendNode extends Component {
  render() {
    const {data} = this.props;
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },

      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'filter',
        },
        {
          type: 'inside',
          xAxisIndex: 0,
          filterMode: 'filter',
        },
      ],
      xAxis: {
        type: 'category',
        data: data.time,
      },
      yAxis: {
        type: 'value',
      },

      grid: {
        left: '3%',
        right: '7%',
        bottom: '15%',
        containLabel: true,
      },
      series: [
        {
          name: data.node[0].name,
          data: data.node[0].value,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#FF6D7B',
              barBorderRadius: 7,
            },
          },
        },
      ],
    };

    return (
      // <View style={[s.box, this.props.style]}>
      <Block {...this.props}>
        <Block flex={false} margin={[25, 0]} center middle>
          <Text center>日预警监测点数</Text>
        </Block>
        <Echarts
          option={option}
          height={260}
          marginTop={-50}
          data={this.props.data}
        />
      </Block>
      // </View>
    );
  }
}
