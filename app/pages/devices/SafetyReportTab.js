import React, {Component} from 'react';

import {
  Block,
  FilterButton,
  FilterText,
  Text,
  Content,
  ContentFooter,
} from '../../components/common';
import SwipeView from '../../components/common/SwipeView';
import ReportBox from '../../components/ReportBox';

export default class SafetyReportTab extends Component {
  render() {
    return (
      <Content>
        <SwipeView
          ref={swipeView => (this.swipeView = swipeView)}
          isRefresh={true}
          isLoading={true}
          {...this.props}
          renderItem={({item}, rowMap) => {
            return <ReportBox key={item.key} reportData={item} margin= {[10, 10, 0, 10]} />;
          }}
        />
        <ContentFooter />
      </Content>
    );
  }
}
