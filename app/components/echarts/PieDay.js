/**
 * 分布图，圆形图
 */
import React, {Component} from 'react';
import Pie from './Pie';
import {alertLevels as level} from '../../constants/status';

//时间安全分布图
export default class PieDay extends Component {
  render() {
    const {data} = this.props;
    return (
      <Pie
        data={[
          {
            name: '数量',
            value: data.map((v, key) => ({
              id: key + 1,
              name: level[key + 1].name,
              value: parseInt(v),
              color: level[key + 1].color,
            })),
          },
        ]}
        totalTitle="总天数"
        color={true}
        legend={Object.keys(level).map(v => level[v].name)}
      />
    );
  }
}
