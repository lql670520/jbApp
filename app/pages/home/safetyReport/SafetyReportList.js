import React, {Component} from 'react';
import ReportBox from '../../../components/ReportBox';
import SwipeView from '../../../components/common/SwipeView';
import {Actions} from 'react-native-router-flux';

export default class SafetyReportList extends Component {
  render() {
    return (
      <SwipeView
        ref={swipeView => (this.swipeView = swipeView)}
        isRefresh={true}
        isLoading={true}
        {...this.props}
        renderItem={({item}, rowMap) => {
          return (
            <ReportBox
              key={item.key}
              reportData={item}
              onPress={() => {
                Actions.safetyReportDetailPage({params: {id: item.id}});
              }}
            />
          );
        }}
      />
    );
  }
}
