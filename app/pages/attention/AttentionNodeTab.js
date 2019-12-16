import React, {Component} from 'react';
import {SwipeView, SwipeButton, SwipeBox} from '../../components/common';
import NodeBox from '../../components/NodeBox';
import {Alert} from 'react-native';

export default class AttentionNodeTab extends Component {
  render() {
    return (
      <SwipeView
        ref={swipeView => (this.swipeView = swipeView)}
        isRefresh={true}
        isLoading={true}
        {...this.props}
        renderItem={({item}, rowMap) => {
          return <NodeBox key={item.id} nodeData={item.node} />;
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
