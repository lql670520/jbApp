/**
 * 安全评分趋势图
 */
import React, {Component} from 'react';
import Echarts from 'native-echarts';
import {View, Text} from 'react-native';

import LevelLegned from './LevelLegned';
const list = {
  time: [
    '2019-10-01',
    '2019-10-02',
    '2019-10-03',
    '2019-10-04',
    '2019-10-05',
    '2019-10-06',
    '2019-10-07',
    '2019-10-08',
    '2019-10-09',
    '2019-10-10',
    '2019-10-11',
    '2019-10-12',
    '2019-10-13',
    '2019-10-14',
    '2019-10-15',
    '2019-10-16',
    '2019-10-17',
    '2019-10-18',
    '2019-10-19',
  ],
  data: [
    {
      name: '安全评分',
      value: [
        '17',
        '52',
        '51',
        '51',
        '51',
        '54',
        '53',
        '54',
        '66',
        '52',
        '52',
        '55',
        '60',
        '61',
        '54',
        '61',
        '59',
        '60',
        '59',
      ],
    },
  ],
};
const monthDate = '2019-10';

export default class SafetyCalendar extends Component {
  render() {
    const option = {
      visualMap: {
        show: true,
        // min: 0,
        // max: 1000
      },

      calendar: [
        {
          orient: 'vertical',
          yearLabel: {
            margin: 40,
          },
          monthLabel: {
            nameMap: 'cn',
            margin: 20,
          },
          dayLabel: {
            firstDay: 1,
            nameMap: 'cn',
          },
          cellSize: 40,
          range: '2017-01',
        },
      ],
      series: {
        type: 'scatter',
        coordinateSystem: 'calendar',
        data: [['2017-01-02', 900], ['2017-01-01', 877], ['2017-01-05', 699]],
      },
    };

    return (
      <View style={[this.props.style]}>
        <LevelLegned />
        <Echarts option={option} height={400} />
      </View>
    );
  }
}
