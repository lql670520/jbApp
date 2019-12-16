import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {Container, Content, Header, Tabs} from '../../../components/common';
import PickerProject from '../../../components/PickerProject';
import PickerDate from '../../../components/PickerData';
import {theme} from '../../../constants';

import SafetyPointDayTab from './SafetyPointDayTab';
import SafetyPointTimeTab from './SafetyPointTimeTab';

class SafetyPointPage extends Component {
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
      type: 'countProject/trend',
      payload: {
        project_id: projectId ? projectId : currentProject.id,
        type: 'day',
        date: this.state.date,
      },
    });
    dispatch({
      type: 'countProject/trend',
      payload: {
        project_id: projectId ? projectId : currentProject.id,
        type: 'month',
        date: this.state.date,
      },
    });
  };

  render() {
    const {trendDay, trendMonth, alertLevel} = this.props;
    const tabsConfig = [
      {
        title: '日数据',
        tabContainer: <SafetyPointTimeTab data={trendDay} />,
        tabBarOnPress: () => {
          this.setState({dateType: 'day'});
        },
      },
      {
        title: '月数据',
        tabContainer: <SafetyPointDayTab data={trendMonth} />,
        tabBarOnPress: () => {
          this.setState({dateType: 'month'});
        },
      },
    ];

    return (
      <Container color={`alertColor${alertLevel}`}>
        {/* 头部 */}
        <Header
          noColor
          leftIcon={['goback']}
          rightIcon={[]}
          dispatch={this.props.dispatch}
        />
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
        {/* tabs */}
        <Content>
          <Tabs
            tabsConfig={tabsConfig}
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
            }}
            tabBarRadius={20}
            tabBarBorder={1}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(({init, countProject}) => ({
  alertLevel: init.summery.alertLevel,
  currentProject: init.currentProject,
  trendDay: countProject.trendDay,
  trendMonth: countProject.trendMonth,
}))(SafetyPointPage);
