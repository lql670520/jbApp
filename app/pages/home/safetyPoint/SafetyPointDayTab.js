import React, {Component} from 'react';

import {TabContent} from '../../../components/common';
import SafetyTrend from '../../../components/echarts/SafetyTrend';

export default class SafetyPointDayTab extends Component {
  render() {
    return (
      <TabContent>
        <SafetyTrend margin={[30, 0]} data={this.props.data} />
      </TabContent>
    );
  }
}
