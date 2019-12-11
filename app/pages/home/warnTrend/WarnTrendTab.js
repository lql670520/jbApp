import React, {Component} from 'react';
import {TabContent} from '../../../components/common';

import {
  WarnTrendEvent,
  WarnTrendNode,
} from '../../../components/echarts/WarnTrend';

export default class WarnTrendTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TabContent>
        <WarnTrendEvent data={this.props.data} />
        <WarnTrendNode margin={[0, 0, 50, 0]} data={this.props.data} />
      </TabContent>
    );
  }
}
