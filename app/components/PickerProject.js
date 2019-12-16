/**
 * 项目选择控件
 */
import React, {Component} from 'react';
import {Block, Text, TextIcon, Icon, PickerBase} from './common';
import {theme} from '../constants';
import {connect} from 'react-redux';

class PickerProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectArr: null,
      // project: ['福建省'],
      // project: ['福建省', '福州市', '军门社区'],
      // project: this.project.currentProject,
    };
  }

  //打开项目选择框
  openProject() {
    const {currentProject} = this.props;
    this.picker._show(currentProject.pickerName);
  }

  //回调设置值
  _callBackValue = value => {
    const {projects, dispatch} = this.props;
    //通过名称信息获取数据
    const project = projects
      .filter(item => item.name === value[0])[0]
      .children.filter(item => item.name === value[1])[0]
      .children.filter(item => item.name === value[2])[0];

    //切换当前项目
    dispatch({
      type: 'init/updateCurrentProject',
      payload: {data: project},
    });
  };

  //创建数据
  _createData = () => {
    const {projects} = this.props;

    // this.state.projectArr的作用用于优化速度，由于项目只有登录的时候初始化
    // if (this.state.projectArr) {
    //   return this.state.projectArr;
    // } else {
    let dataArray = []; //第一层
    if (projects) {
      for (let i = 0; i < projects.length; i++) {
        //第二层数据
        const secondData = projects[i].children;
        let secondArray = [];
        for (let j = 0; j < secondData.length; j++) {
          //第三层数据
          const threeData = secondData[j].children;
          let threeArray = [];
          for (let k = 0; k < threeData.length; k++) {
            threeArray.push(threeData[k].name); //添加到第三层
          }
          let three = {};
          three[secondData[j].name] = threeArray;
          secondArray.push(three); //添加到第二层
        }
        let second = {};
        second[projects[i].name] = secondArray;
        dataArray.push(second); //添加到第1层
      }
    }
    // this.setState({projectArr: dataArray});
    return dataArray;
    // }
  };

  _showProjectText = () => {
    const {componentType, currentProject} = this.props;
    return componentType === 'maxText' ? (
      <Block flex={false}>
        <Text gray3 center>
          {currentProject && currentProject.pickerName
            ? currentProject.pickerName[0] + '.' + currentProject.pickerName[1]
            : ''}
        </Text>
        <Text h1 center white>
          {currentProject && currentProject.pickerName
            ? currentProject.pickerName[2]
            : ''}
        </Text>
      </Block>
    ) : componentType === 'min' ? (
      <TextIcon
        text={
          currentProject && currentProject.pickerName
            ? currentProject.pickerName[0] +
              '.' +
              currentProject.pickerName[1] +
              '.' +
              currentProject.pickerName[2]
            : ''
        }
        iconName={'ios-arrow-down'}
        onPress={() => this.openProject()}
      />
    ) : componentType === 'medium' ? (
      <Block flex={false} touchableOpacity onPress={() => this.openProject()}>
        <Text black center>
          {currentProject && currentProject.pickerName
            ? currentProject.pickerName[0] + '.' + currentProject.pickerName[1]
            : ''}
        </Text>

        <Block flex={false} row center middle>
          <Text h2 center black semibold>
            {currentProject && currentProject.pickerName
              ? currentProject.pickerName[2]
              : ''}
          </Text>
          <Icon
            name="ios-arrow-down"
            size={20}
            color={'#808080'}
            style={{marginLeft: 5, marginTop: 5}}
          />
        </Block>
      </Block>
    ) : componentType === 'icon' ? (
      <Block
        flex={false}
        row
        color={'white'}
        borderRadius={10}
        margin={[0, 20]}
        touchableOpacity
        onPress={() => this.openProject()}>
        <Block row margin={[10]}>
          <Block flex={false} row center margin={[0,5,0,0]}>
            <Icon image name={require('../assets/img/p.png')} size={40}></Icon>
          </Block>
          <Block>
            <Text black>
              {currentProject && currentProject.pickerName
                ? currentProject.pickerName[0] +
                  '.' +
                  currentProject.pickerName[1]
                : ''}
            </Text>

            <Block flex={false} row center space="between">
              <Block>
                <Text h1 black>
                  {currentProject && currentProject.pickerName
                    ? currentProject.pickerName[2]
                    : ''}
                </Text>
              </Block>
              <Icon
                name="ios-arrow-forward"
                size={25}
                color={theme.colors.black}
                style={{marginLeft: 5, marginTop: 5}}
              />
            </Block>
          </Block>
        </Block>
      </Block>
    ) : (
      <Block flex={false} touchableOpacity onPress={() => this.openProject()}>
        <Text gray3 center>
          {currentProject && currentProject.pickerName
            ? currentProject.pickerName[0] + '.' + currentProject.pickerName[1]
            : ''}
        </Text>

        <Block flex={false} row center middle>
          <Text h1 center white>
            {currentProject && currentProject.pickerName
              ? currentProject.pickerName[2]
              : ''}
          </Text>
          <Icon
            name="ios-arrow-down"
            size={30}
            color={theme.colors.gray3}
            style={{marginLeft: 5, marginTop: 5}}
          />
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex={false} center middle margin={this.props.margin}>
        {this._showProjectText()}
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
  currentUser: init.currentUser,
  currentProject: init.currentProject,
  projects: init.projects,
}))(PickerProject);
