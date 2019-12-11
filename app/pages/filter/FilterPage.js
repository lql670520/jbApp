import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Block, Text, Icon, MinLegned, Close} from '../../components/common';

class RowBlock extends Component {
  render() {
    const {type, name, imageColor, active, size} = this.props;

    const activeStyle =
      active || active === true
        ? {
            border: 2,
            color: 'rgba(55,116,255,0.2)',
            borderColor: 'bule',
            card: true,
          }
        : {};
    return (
      <Block flex={false} width={'25%'} center middle {...this.props}>
        <Block
          flex={false}
          middle
          center
          padding={5}
          height={90}
          width={90}
          margin={[10, 0]}
          {...activeStyle}
          touchableOpacity
          onPress={this.props.onPress}>
          {type === 'image' ? (
            <Icon
              image
              name={imageColor}
              size={size ? size : 50}
              style={{marginVertical: size == 24 ? 13 : 0}}
            />
          ) : (
            <MinLegned
              size={size ? size : 24}
              margin={[13, 0]}
              color={imageColor}
            />
          )}
          <Text>{name}</Text>
          {/* {this.props.children} */}
        </Block>
      </Block>
    );
  }
}

class FilterBlock extends Component {
  render() {
    const {tilte, list} = this.props;
    return (
      <Block flex={false} margin={[0, 10]}>
        <Text gray> {tilte} </Text>
        <Block flex={false} center row wrap>
          {list.map((item, i) => {
            return (
              <RowBlock
                key={i}
                active={item.active}
                type={item.type}
                name={item.name}
                imageColor={item.type === 'image' ? item.image : item.color}
                size={item.size ? item.size : 24}
                onPress={(_, index = i) => {
                  list.map((v, k) => {
                    if (k === index) {
                      v.active = true;
                    } else {
                      v.active = false;
                    }
                    return v;
                  });
                  //刷新
                  this.setState({});
                }}
              />
            );
          })}
        </Block>
      </Block>
    );
  }
}

import {
  taskStatus,
  todoAssessStatus,
  alertLevels,
  analyseTypes,
  dangerLevels,
} from '../../constants/status';
import common from '../../utils/common';
import {Actions} from 'react-native-router-flux';
class FilterPage extends Component {
  constructor(props) {
    super(props);
    const {show, categoryData} = props;

    let taskId = 0;
    let todoAssessId = 0;
    let alertId = 0;
    let dangerId = 0;
    let analyseId = 0;
    let categoryId = 0;

    if (show && show.type && Array.isArray(show.type)) {
      show.type.map((item, index) => {
        const id =
          show.currentData &&
          show.currentData[index] &&
          show.currentData[index].id > 0
            ? show.currentData[index].id
            : 0;
        if (item === 'task') {
          taskId = id;
        } else if (item === 'todoAssess') {
          todoAssessId = id;
        } else if (item === 'alertLevel') {
          alertId = id;
        } else if (item === 'dangerLevel') {
          dangerId = id;
        } else if (item === 'analyse') {
          analyseId = id;
        } else if (item === 'category') {
          categoryId = id;
        }
      });
    }

    let categoryStatus = {};
    categoryData.map(v => {
      v.type = 'image';
      v.size = 50;
      if (v.code === '1001') {
        v.image = require('../../assets/img/ct1001.png');
      } else if (v.code === '1002') {
        v.image = require('../../assets/img/ct1002.png');
      } else if (v.code === '1003') {
        v.image = require('../../assets/img/ct1003.png');
      }
      return (categoryStatus[v.id] = v);
    });

    this.state = {
      taskList: [...Object.values(common.newStateObject(taskStatus, taskId))],
      todoAssessList: [
        ...Object.values(common.newStateObject(todoAssessStatus, todoAssessId)),
      ],
      alertLevelList: [
        ...Object.values(common.newStateObject(alertLevels, alertId)),
      ],
      dangerLevelList: [
        ...Object.values(common.newStateObject(dangerLevels, dangerId)),
      ],
      analyseList: [
        ...Object.values(common.newStateObject(analyseTypes, analyseId)),
      ],
      categoryList: [
        ...Object.values(common.newStateObject(categoryStatus, categoryId)),
      ],
    };
  }

  render() {
    const {show} = this.props;
    return (
      <Block>
        <Close />
        {show && show.type && Array.isArray(show.type)
          ? show.type.map((item, index) => {
              if (item === 'task') {
                return (
                  <FilterBlock tilte={'任务状态'} list={this.state.taskList} />
                );
              } else if (item === 'todoAssess') {
                return (
                  <FilterBlock
                    tilte={'整改状态'}
                    list={this.state.todoAssessList}
                  />
                );
              } else if (item === 'alertLevel') {
                return (
                  <FilterBlock
                    tilte={'安全等级'}
                    list={this.state.alertLevelList}
                  />
                );
              } else if (item === 'dangerLevel') {
                return (
                  <FilterBlock
                    tilte={'安全等级'}
                    list={this.state.dangerLevelList}
                  />
                );
              } else if (item === 'analyse') {
                return (
                  <FilterBlock
                    tilte={'隐患问题类型'}
                    list={this.state.analyseList}
                  />
                );
              } else if (item === 'category') {
                return (
                  <FilterBlock
                    tilte={'监测类型'}
                    list={this.state.categoryList}
                  />
                );
              }
            })
          : null}

        <Block bottom>
          <Block
            touchableOpacity
            onPress={() => {
              if (show && show.type && Array.isArray(show.type)) {
                let rsList = [];
                show.type.map((item, index) => {
                  let list = [];
                  if (item === 'task') {
                    list = this.state.taskList;
                  } else if (item === 'todoAssess') {
                    list = this.state.todoAssessList;
                  } else if (item === 'alertLevel') {
                    list = this.state.alertLevelList;
                  } else if (item === 'dangerLevel') {
                    list = this.state.dangerLevelList;
                  } else if (item === 'analyse') {
                    list = this.state.analyseList;
                  } else if (item === 'category') {
                    list = this.state.categoryList;
                  }
                  const activeData = list.filter(v => v.active === true);
                  if (activeData && activeData[0]) {
                    rsList.push(activeData[0]);
                  }
                });
                show.callBack(rsList);
              }

              Actions.pop();
            }}
            flex={false}
            color={'bule'}
            borderRadius={50}
            margin={[0, 10, 20]}>
            <Text padding={[10, 0]} color={'white'} center>
              确定
            </Text>
          </Block>
        </Block>
      </Block>
    );
  }
}

export default connect(({init}) => ({
  categoryData: init.currentProject.category,
}))(FilterPage);
