import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {Container, Content, Header, Tabs} from '../../../components/common';
import PickerProject from '../../../components/PickerProject';
import PickerDate from '../../../components/PickerData';
import {theme} from '../../../constants';

import WarnLogTab from './WarnLogTab';
import WarnTrendTab from './WarnTrendTab';

class WarnTrendPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateType: 'month',
      date: moment().format('YYYY-MM-DD'),
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

  //调用日期回调行数
  _callGetDate = dateValue => {
    this.setState({date: dateValue});
    this.fetch();
  };

  fetch = projectId => {
    const {dispatch, currentProject} = this.props;
    dispatch({
      type: 'safetyEventCount/trend',
      payload: {
        project_id: projectId ? projectId : currentProject.id,
        log_day: this.state.date,
      },
    });

    //刷新
    this.warnLog.swipeView.onRefresh(() => {
      return dispatch({
        type: 'safetyEventLog/list',
        payload: {
          project_id: projectId ? projectId : currentProject.id,
          log_day: this.state.date,
          page: 1,
        },
      });
    });
  };

  render() {
    const {
      alertLevel,
      safetyEventTrend,
      pagination,
      pagedList,
      currentProject,
    } = this.props;

    const tabsConfig = [
      {
        title: '预警趋势图',
        tabContainer: <WarnTrendTab data={safetyEventTrend} />,
        tabBarOnPress: () => {
          this.setState({dateType: 'month'});
        },
      },
      {
        title: '预警日志',
        tabContainer: (
          <WarnLogTab
            ref={warnLog => (this.warnLog = warnLog)}
            pagination={pagination}
            data={pagedList}
            callLoadData={payload => {
              return this.props.dispatch({
                type: 'safetyEventLog/list',
                payload: {
                  project_id: currentProject.id,
                  log_day: this.state.date,
                  ...payload,
                },
              });
            }}
          />
        ),
        tabBarOnPress: () => {
          this.setState({dateType: 'day'});
        },
      },
    ];
    return (
      <Container color={`alertColor${alertLevel}`}>
        {/* 头部 */}
        <Header noColor leftIcon={['goback']} rightIcon={[]} />
        {/* 项目选择框 */}
        <PickerProject margin={[10, 0, 0, 0]} />
        {/* 日期选择框 */}
        <PickerDate
          ref={pickerDate => (this.pickerDate = pickerDate)}
          margin={[10, 0, 20, 0]}
          dateType={this.state.dateType}
          date={this.state.date}
          _callGetDate={this._callGetDate}
        />

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

export default connect(({init, safetyEventCount, safetyEventLog}) => ({
  alertLevel: init.summery.alertLevel,
  currentProject: init.currentProject,
  safetyEventTrend: safetyEventCount.trend,
  pagedList: safetyEventLog.pagedList,
  pagination: safetyEventLog.pagination,
}))(WarnTrendPage);
