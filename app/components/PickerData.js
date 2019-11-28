/**
 * 日期选择控件
 */
import React, {Component} from 'react';

import {Block, Text, Icon, PickerBase} from './common';
import {theme} from '../constants';

export default class PickerDate extends Component {
  constructor(props) {
    super(props);
    const date = new Date();
    this.state = {
      time: [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date
          .getDate()
          .toString()
          .padStart(2, '0'),
      ],
    };
  }

  //打开
  openTime() {
    this.picker._show(this.state.time);
  }

  //回调设置值
  _callBackValue = value => {
    if (this.props.dateType === 'month' && !value[2]) {
      value[2] = this.state.time[2];
    }
    this.setState({
      time: value,
    });
  };

  //期数据
  _createData = () => {
    let date = [];
    const startYear = new Date().getFullYear() - 10; //前10
    const endYear = new Date().getFullYear() + 10; //后10
    for (let i = startYear; i <= endYear; i++) {
      let month = [];
      for (let j = 1; j < 13; j++) {
        if (this.props.dateType !== 'month') {
          let day = [];
          if (j === 2) {
            for (let k = 1; k < 29; k++) {
              day.push(k.toString().padStart(2, '0') + '');
            }
            //Leap day for years that are divisible by 4, such as 2000, 2004
            if (i % 4 === 0) {
              day.push(29 + '');
            }
          } else if (j in {1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1}) {
            for (let k = 1; k < 32; k++) {
              day.push(k.toString().padStart(2, '0') + '');
            }
          } else {
            for (let k = 1; k < 31; k++) {
              day.push(k.toString().padStart(2, '0') + '');
            }
          }

          let _month = {};
          _month[j.toString().padStart(2, '0') + ''] = day;
          month.push(_month);
        } else {
          month.push(j.toString().padStart(2, '0'));
        }
      }
      let _date = {};
      _date[i + ''] = month;
      date.push(_date);
    }
    return date;
  };

  render() {
    const {dateType, color} = this.props;
    const meColor = color
      ? theme.colors[color]
        ? theme.colors[color]
        : color
      : '#fff';
    return (
      <Block flex={false} center middle margin={this.props.margin}>
        <Block
          flex={false}
          touchableOpacity
          row
          onPress={() => this.openTime()}>
          <Text center color={meColor}>
            {dateType === 'month'
              ? this.state.time[0] + '-' + this.state.time[1]
              : this.state.time[0] +
                '-' +
                this.state.time[1] +
                '-' +
                this.state.time[2]}
          </Text>
          <Icon
            name="ios-calendar"
            size={25}
            color={meColor}
            style={{marginLeft: 5}}
          />
        </Block>
        <PickerBase
          ref={picker => (this.picker = picker)}
          callBackValue={this._callBackValue}
          createData={this._createData}
        />
      </Block>
    );
  }
}
