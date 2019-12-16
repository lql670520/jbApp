/**
 * 分布图，圆形图
 */
import React, {Component} from 'react';
import Pie from './Pie';
import {alertLevels as level} from '../../constants/status';

//监测点安全分布图
export default class PieNode extends Component {
  render() {
    const {data} = this.props;
    return (
      <Pie
        data={[
          {
            // name: '数量',
            value: data.map((v, key) => ({
              id: key + 1,
              name: level[key + 1].name,
              value: parseInt(v),
              color: level[key + 1].color,
            })),
          },
        ]}
        totalTitle="总数量"
        color={true}
        legend={Object.keys(level).map(v => level[v].name)}
      />
    );
  }
}
