/**
 * 分布图，圆形图
 */
import React, {Component} from 'react';
import Echarts from 'native-echarts';
import {Block, Text} from '../common';
import {alertLevels as alertLevelMap} from '../../constants/status';

//预警事件数
export default class Pie extends Component {
  render() {
    const {legend, data, color, itemStyle, label, totalTitle} = this.props;
    let total = 0;

    const series = data.map((e, index) => {
      e.value &&
        e.value.length > 0 &&
        e.value.map(v => {
          total += v.value;
        });
      return {
        name: e.name,
        type: 'pie',
        data: e.value,
        radius: e.radius ? e.radius : ['50%', '80%'],
        center: e.center ? e.center : ['30%', '50%'],
        labelLine: {
          normal: {
            show: false, // show设置线是否显示，默认为true，可选值：true ¦ false
          },
        },
        label: label
          ? label
          : {
              normal: {
                show: false,
              },
            },
        itemStyle: {
          normal: {
            color: params => {
              return params.data.color;
            },
          },
        },
      };
    });
    let option = {
      // title: {
      //   text: title
      // },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },
      // graphic: {
      //   type: 'text',
      //   left: 'center',
      //   top: 'center',
      //   style: {
      //     text:
      //       'Part1\n   财务规划，绩效和控制\n  Financial Reporting ,\nPlanning,Performance\n and Control',
      //     textAlign: 'center',
      //     fill: '#000',
      //     width: 30,
      //     height: 30,
      //   },
      // },
      legend: {
        // ...legendArea,
        left: '67%',
        top: '20%',
        orient: 'vertical',
        icon: 'circle',
        itemGap: 25,
        formatter: function(name) {
          return name;
          // let target;
          //   let total = 0;
          //   for(let i=0;i<data.length;i++){
          //     data[i].value.map(v=>{
          //       total += v.value
          //       if(v.name===name){
          //         target=v.value
          //       }
          //     })
          //   }
          //   let arr=[name,"{a||}","{a|"+((target/total)*100).toFixed(2)+'%}',' ',target]
          //   return arr.join(" ")
        },
        textStyle: {
          fontSize: '14',
          rich: {
            a: {color: 'rgba(0, 0, 0, 0.45)'},
            lineHeight: '30',
          },
        },
        data: legend,
      },
      calculable: true,
      series: series,
      color: color ? color : [],
    };

    return (
      <Block flex={false} {...this.props}>
        <Block flex={false} absolute center style={{left: '23%', top: '40%'}}>
          <Text>{totalTitle}</Text>
          <Text>{total}</Text>
        </Block>
        <Echarts option={option} height={260} data={this.props.data} />
      </Block>
    );
  }
}
