/**
 * 区域选择控件
 */
import React, {Component} from 'react';
import {Block, Text, Icon, PickerBase} from './common';
import {theme} from '../constants';
import {connect} from 'react-redux';

class PickerDeploymap extends Component {
  componentDidMount() {
    const {dispatch, currentProject, parentId} = this.props;
    if (parentId) {
      dispatch({
        type: 'deploymapSub/list',
        payload: {
          all: true,
          project_id: currentProject.id,
          parent_id: parentId,
        },
      });
    } else {
      dispatch({
        type: 'deploymap/list',
        payload: {
          all: true,
          project_id: currentProject.id,
          parent_id: 0,
        },
      });
    }
  }

  //打开项目选择框
  open() {
    const {currentItem} = this.props;
    this.picker._show([currentItem.name]);
  }

  //回调设置值
  _callBackValue = value => {
    const {list, dispatch, parentId} = this.props;
    //通过名称信息获取数据
    const currentData = list.filter(item => item.name === value[0]);

    //切换当前区域
    if (parentId) {
      dispatch({
        type: 'deploymapSub/detail',
        payload: {
          id: currentData[0].id,
        },
      });
    } else {
      dispatch({
        type: 'deploymap/detail',
        payload: {
          id: currentData[0].id,
        },
      });
    }
  };

  //创建数据
  _createData = () => {
    const {list} = this.props;
    let dataArray = []; //第一层
    if (list) {
      for (let i = 0; i < list.length; i++) {
        dataArray.push(list[i].name);
      }
    }
    return dataArray;
  };

  _showText = () => {
    const {currentProject, currentItem} = this.props;
    return (
      <Block touchableOpacity onPress={() => this.open()}>
        <Text black>
          {currentProject && currentProject.pickerName
            ? currentProject.pickerName[0] +
              '.' +
              currentProject.pickerName[1] +
              '.' +
              currentProject.pickerName[2]
            : ''}
        </Text>

        <Block flex={false} row center>
          <Block>
            <Text h2 black semibold>
              {currentItem && currentItem.name ? currentItem.name : ''}
            </Text>
          </Block>
          {/* <Icon
          image
          name={require('../assets/img/right.png')}
          size={12}          
          style={{marginLeft: 5, marginTop: 5}}
        /> */}
          <Icon
            name="ios-arrow-forward"
            size={20}
            color={theme.colors.black}
            style={{marginLeft: 5, marginTop: 5}}
          />
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex={false} row center middle margin={this.props.margin}>
        {this._showText()}
        <PickerBase
          ref={picker => (this.picker = picker)}
          callBackValue={this._callBackValue}
          createData={this._createData}
        />
      </Block>
    );
  }
}

export default connect(({init}) => ({
  currentProject: init.currentProject,
  // list: deploymap.list,
  // currentItem: deploymap.currentItem,
  // subList: deploymap.subList,
  // subCurrentItem: deploymap.subCurrentItem,
}))(PickerDeploymap);
