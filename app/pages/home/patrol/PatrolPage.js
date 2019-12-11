import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {Container, Content, Header, Tabs} from '../../../components/common';
import PickerProject from '../../../components/PickerProject';

import TaskTab from './TaskTab';
import TodoAssessTab from './TodoAssessTab';

class PatrolPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskFilter: {id: 0},
      todoAssessFilter: {id: 0},
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentProject !== this.props.currentProject) {
      this.fetch(newProps.currentProject.id);
    }
  }

  fetch = projectId => {
    const {currentProject} = this.props;

    //刷新巡检任务
    this.taskOnRefresh({project_id: projectId ? projectId : currentProject.id});

    //刷新整改
    this.todoAssessOnRefresh({
      project_id: projectId ? projectId : currentProject.id,
    });
  };

  //任务刷新
  taskOnRefresh = payload => {
    this.taskTab.swipeView.onRefresh(() => {
      return this.fetchTask(payload);
    });
  };
  fetchTask = payload => {
    const {dispatch, currentProject} = this.props;
    return dispatch({
      type: 'task/list',
      payload: {
        project_id: currentProject.id,
        status:
          this.state.taskFilter.id && this.state.taskFilter.id > 0
            ? this.state.taskFilter.id
            : '',
        page: 1,
        ...payload,
      },
    });
  };

  //整改刷新
  todoAssessOnRefresh = payload => {
    this.todoAssessTab.swipeView.onRefresh(() => {
      return this.fetchTodoAssess(payload);
    });
  };
  fetchTodoAssess = payload => {
    const {dispatch, currentProject} = this.props;
    return dispatch({
      type: 'todoAssess/list',
      payload: {
        project_id: currentProject.id,
        status:
          this.state.todoAssessFilter.id && this.state.todoAssessFilter.id > 0
            ? this.state.todoAssessFilter.id
            : '',
        page: 1,
        ...payload,
      },
    });
  };

  render() {
    const {
      alertLevel,
      taskPagedList,
      taskPagination,
      todoAssessList,
      todoAssessPagination,
    } = this.props;

    const tabsConfig = [
      {
        title: '巡检',
        tabContainer: (
          <TaskTab
            ref={taskTab => (this.taskTab = taskTab)}
            pagination={taskPagination}
            data={taskPagedList}
            callLoadData={payload => {
              return this.fetchTask(payload);
            }}
            filter={this.state.taskFilter}
            filterOnPress={() => {
              Actions.filterPage({
                show: {
                  type: ['task'],
                  currentData: [this.state.taskFilter],
                  callBack: data => {
                    this.setState({taskFilter: data[0]});
                    this.taskOnRefresh({
                      status: data[0].id,
                      page: 1,
                    });
                  },
                },
              });
            }}
          />
        ),
        tabBarOnPress: () => {
          this.setState({dateType: 'day'});
        },
      },
      {
        title: '整改',
        tabContainer: (
          <TodoAssessTab
            ref={todoAssessTab => (this.todoAssessTab = todoAssessTab)}
            pagination={todoAssessPagination}
            data={todoAssessList}
            callLoadData={payload => {
              return this.fetchTodoAssess(payload);
            }}
            filter={this.state.todoAssessFilter}
            filterOnPress={() => {
              Actions.filterPage({
                show: {
                  type: ['todoAssess'],
                  currentData: [this.state.todoAssessFilter],
                  callBack: data => {
                    this.setState({todoAssessFilter: data[0]});
                    this.todoAssessOnRefresh({
                      status: data[0].id,
                      page: 1,
                    });
                  },
                },
              });
            }}
          />
        ),
        tabBarOnPress: () => {
          this.setState({dateType: 'month'});
        },
      },
    ];
    return (
      <Container color={`alertColor${alertLevel}`}>
        {/* 头部 */}
        <Header noColor leftIcon={['goback']} rightIcon={[]} />
        {/* 项目选择框 */}
        <PickerProject margin={[10, 0]} />

        <Content>
          <Tabs
            tabsConfig={tabsConfig}
            style={{
              marginHorizontal: 10,
              marginVertical: 20,
            }}
            tabBarRadius={20}
            tabBarBorder={1}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(({init, task, todoAssess}) => ({
  alertLevel: init.summery.alertLevel,
  currentProject: init.currentProject,
  taskPagedList: task.pagedList,
  taskPagination: task.pagination,
  todoAssessList: todoAssess.pagedList,
  todoAssessPagination: todoAssess.pagination,
}))(PatrolPage);
