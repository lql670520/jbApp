import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Text} from 'react-native';

import {Container, Content, Header} from '../../../components/common';
import PickerProject from '../../../components/PickerProject';
import PickerDate from '../../../components/PickerData';

class SafetyTrendPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateType: 'day',
      date: moment().format('YYYY-MM-DD'),
    };
  }

  componentDidMount() {
    this.fetch();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentProject !== this.props.currentProject) {
      this.fetch();
    }
  }

  //调用日期回调行数
  _callGetDate = dateValue => {
    this.setState({date: dateValue});
    this.fetch();
  };

  fetch = () => {
    const {dispatch, currentProject} = this.props;
    // dispatch({
    //   type: 'countProject/trend',
    //   payload: {
    //     project_id: currentProject.id,
    //     type: 'day',
    //     date: this.state.date,
    //   },
    // });
    // dispatch({
    //   type: 'countProject/trend',
    //   payload: {
    //     project_id: currentProject.id,
    //     type: 'month',
    //     date: this.state.date,
    //   },
    // });
  };

  render() {
    const {alertLevel} = this.props;

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

        <Content>
          <Text>安全趋势</Text>
        </Content>
      </Container>
    );
  }
}

export default connect(({init}) => ({
  alertLevel: init.summery.alertLevel,
  currentProject: init.currentProject,
}))(SafetyTrendPage);
