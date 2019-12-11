import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Container, Content, Header} from '../../../components/common';
import PickerProject from '../../../components/PickerProject';
import SafetyReportList from './SafetyReportList';

class SafetyReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const {dispatch, currentProject} = this.props;

    //刷新
    this.warnLog.swipeView.onRefresh(() => {
      return dispatch({
        type: 'safetyReport/list',
        payload: {
          project_id: projectId ? projectId : currentProject.id,
          page: 1,
        },
      });
    });
  };

  render() {
    const {alertLevel, currentProject, pagination, pagedList} = this.props;

    return (
      <Container color={`alertColor${alertLevel}`}>
        {/* 头部 */}
        <Header noColor leftIcon={['goback']} rightIcon={[]} />
        {/* 项目选择框 */}
        <PickerProject margin={[10, 0, 20, 0]} />
        {/* 日期选择框 */}

        <Content>
          <SafetyReportList
            ref={warnLog => (this.warnLog = warnLog)}
            pagination={pagination}
            data={pagedList}
            callLoadData={payload => {
              return this.props.dispatch({
                type: 'safetyReport/list',
                payload: {
                  project_id: currentProject.id,
                  page: 1,
                  ...payload,
                },
              });
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(({init, safetyReport}) => ({
  alertLevel: init.summery.alertLevel,
  currentProject: init.currentProject,

  pagedList: safetyReport.pagedList,
  pagination: safetyReport.pagination,
}))(SafetyReportPage);
