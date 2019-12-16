import React, {Component} from 'react';
import {SwipeView, SwipeBox, SwipeButton} from '../../components/common';
import DeploymapBox from '../../components/DeploymapBox';
import {Alert} from 'react-native';

export default class AttentionDeploymapTab extends Component {
  render() {
    return (
      <SwipeView
        ref={swipeView => (this.swipeView = swipeView)}
        isRefresh={true}
        isLoading={true}
        {...this.props}
        renderItem={({item}, rowMap) => {
          return (
            <DeploymapBox
              key={item.id}
              deploymapData={item.deploymap}
              onPress={() => {
                // if (sub) {
                //   Actions.deploymapSubDetailPage({params: {id: item.id}});
                // } else {
                //   Actions.deploymapDetailPage({params: {id: item.id}});
                // }
              }}
            />
          );
        }}
        leftSwipe={true}
        rightOpenValue={-100}
        stopRightSwipe={-100}
        renderHiddenItem={(rowData, rowMap) => (
          <SwipeBox card margin={[0, 10, 10, 10]}>
            <SwipeButton
              title="取消关注"
              width={100}
              color="red"
              onPress={() => {
                Alert.alert('提示', '是否取消关注', [
                  {text: '否'},
                  {
                    text: '是',
                    onPress: () => {
                      const id = rowData.item.id;
                      if (id) {
                        this.props.callDelete(id).then(_ => {
                          this.swipeView.delete(rowData.item.id);
                        });
                      }
                    },
                  },
                ]);
              }}
            />
          </SwipeBox>
        )}
      />
    );
  }
}
