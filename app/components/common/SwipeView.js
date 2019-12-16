import React, {PureComponent} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import {View, RefreshControl, ActivityIndicator} from 'react-native';

import {Text, NoData} from '../common';
import {theme} from '../../constants';

class LoaderMorer extends PureComponent {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>正在加载更多</Text>
        <ActivityIndicator
          color={theme.colors.gray_}
          size={'large'}
          animating={true}
        />
      </View>
    );
  }
}

class NoMorer extends PureComponent {
  render() {
    return (
      <View style={{alignItems: 'center', height: 60}}>
        <Text padding={[10, 0]}>没有更多</Text>
      </View>
    );
  }
}

export default class SwipeView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isRefresh: false,
      loadMore: true, //是否能加载更多
      isMore: false, //是否加载数据
      currentPage: 1,
      flatListData: [],
    };
  }

  // componentDidMount() {
  //   this.onRefresh();
  // }

  onRefresh = callRefresh => {
    this.setState({
      isRefresh: true,
    });
    if (callRefresh) {
      callRefresh().then(_ => {
        this.setState({
          isRefresh: false,
          loadMore: true, //是否能加载更多
          isMore: false, //是否加载数据
          currentPage: 1,
          flatListData: this.props.data,
        });
      });
    } else {
      this.props.callLoadData({page: 1}).then(_ => {
        this.setState({
          isRefresh: false,
          loadMore: true, //是否能加载更多
          isMore: false, //是否加载数据
          currentPage: 1,
          flatListData: this.props.data,
        });
      });
    }
  };

  onLoadMore = () => {
    const {callLoadData, pagination} = this.props;
    const pageSize = Math.ceil(pagination.total / pagination.pageSize); //总页数

    if (pageSize > this.state.currentPage && this.state.loadMore === true) {
      const nextPage = this.state.currentPage + 1; //下一页
      callLoadData({page: nextPage}, {isMore: true}).then(_ => {
        const flatListData = this.state.flatListData.concat(this.props.data);
        // console.log('flatListData', flatListData);
        this.setState({
          isRefresh: false,
          currentPage: nextPage,
          flatListData: flatListData,
        });
      });
    } else {
      this.setState({
        loadMore: false, //不需要加载了
      });
    }
  };

  //删除数据
  delete = id => {
    if (id && this.state.flatListData.length > 0) {
      const flatListData = this.state.flatListData.filter(
        item => item.id !== id,
      );
      this.setState({flatListData: flatListData});
    }
  };

  render() {
    const {isRefresh, isLoading} = this.props;
    return (
      <SwipeListView
        style={{paddingHorizontal: 10}}
        useFlatList={true}
        data={
          Array.isArray(this.state.flatListData)
            ? this.state.flatListData
            : null
        }
        keyExtractor={(item, index) => String(item.id)}
        //设置下拉刷新
        refreshControl={
          isRefresh === true ? (
            <RefreshControl
              title={'加载中...'} //android中设置无效
              colors={[theme.colors.gray_]} //android
              tintColor={theme.colors.gray_} //ios
              titleColor={theme.colors.gray_}
              refreshing={this.state.isRefresh}
              onRefresh={() => {
                this.onRefresh(); //下拉刷新加载数据
              }}
            />
          ) : null
        }
        ListFooterComponent={
          isLoading === true && this.state.flatListData.length > 0
            ? () => {
                return this.state.loadMore ? <LoaderMorer /> : <NoMorer />;
              }
            : null
        } //上拉加载更多视图
        ListEmptyComponent={() =>
          this.state.flatListData.length === 0 ? <NoData /> : null
        }
        // onScroll={1}
        onEndReachedThreshold={0.5}
        onEndReached={
          isLoading === true
            ? () => {
                this.state.loadMore ? this.onLoadMore() : null;
              }
            : null
        }
        renderItem={(rowData, rowMap) => this.props.renderItem(rowData, rowMap)}
        renderHiddenItem={(rowData, rowMap) =>
          this.props.renderHiddenItem
            ? this.props.renderHiddenItem(rowData, rowMap)
            : null
        }
        closeOnRowPress={true} //当按下一行，关闭打开的行
        closeOnScroll={true} //列表滚动时关闭打开的行
        //禁止右滑
        disableRightSwipe={this.props.rightSwipe ? false : true}
        leftOpenValue={this.props.leftOpenValue ? this.props.leftOpenValue : 75} //列表项左滑translateX的值：正值75 * 4
        stopLeftSwipe={
          this.props.stopLeftSwipe ? this.props.stopLeftSwipe : 75 * 2
        } //列表项左滑translateX最大的值：正值75 * 4
        //禁止左滑
        disableLeftSwipe={this.props.leftSwipe ? false : true}
        rightOpenValue={
          this.props.rightOpenValue ? this.props.rightOpenValue : -75
        } //列表项右滑translateX的值：负值
        stopRightSwipe={
          this.props.stopRightSwipe ? this.props.stopRightSwipe : -75 * 2
        } //列表项右滑translateX最大的值：负值
      />
    );
  }
}
