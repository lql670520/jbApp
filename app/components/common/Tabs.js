import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {theme} from '../../constants';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    //tab配置文件
    const tabsConfig = this.props.tabsConfig ? this.props.tabsConfig : [];

    //tabs宽度
    const tabsWidth =
      this.props.style && this.props.style.marginHorizontal
        ? Dimensions.get('window').width - this.props.style.marginHorizontal * 2
        : Dimensions.get('window').width;

    //tabBar宽度
    const tabBarWith = tabsWidth / tabsConfig.length;

    this.state = {
      tabBarArr: [],
      scrollWidth: Dimensions.get('window').width,
      tabBarWith: tabBarWith,
    };
  }

  componentDidMount() {
    this._setIndex(0);
  }

  render() {
    const {style} = this.props;
    return (
      <View style={styles.container}>
        <View
          style={{
            width: this.tabsWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            ref={flatList => (this._flatList = flatList)}
            renderItem={this._renderTabBar}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.tabBarArr}
            keyExtractor={(v, i) => i}
            style={{...style}}
          />
        </View>

        <ScrollView
          ref={scrollView => (this._scrollView = scrollView)}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this._onAnimationEnd}
          scrollEnabled={false} //禁止水平滑动
        >
          {this._renderTabContainer()}
        </ScrollView>
      </View>
    );
  }

  //设置选中tab下标
  _setIndex(index) {
    const {tabsConfig} = this.props;
    if (index >= tabsConfig.length) {
      return;
    }

    const arr = tabsConfig.map((v, i) => {
      v.index = i;
      v.selected = i === index ? true : false;
      return v;
    });

    this.setState({
      tabBarArr: arr,
    });
  }

  //渲染tabBar组件
  _renderTabBar = (data, index) => {
    const {
      activeStyle, //选中背景样式
      unActiveColor, //未选中的字体样式
      activeColor, //选中字体样式
      tabBarStyle, //tabBar样式
      tabsConfig,
      tabBarRadius, //半圆度
      tabBarBorder, //线条
      tabBarBorderColor, //线条颜色
    } = this.props;

    const length = tabsConfig.length;
    let radiusStyle = {};
    let borderStyle = {};
    if (tabBarRadius) {
      radiusStyle = {
        borderTopLeftRadius: data.item.index === 0 ? tabBarRadius : 0,
        borderBottomLeftRadius: data.item.index === 0 ? tabBarRadius : 0,
        borderTopRightRadius: data.item.index === length - 1 ? tabBarRadius : 0,
        borderBottomRightRadius:
          data.item.index === length - 1 ? tabBarRadius : 0,
        overflow: 'hidden',
      };
    }
    if (tabBarBorder) {
      borderStyle.borderColor = tabBarBorderColor
        ? tabBarBorderColor
        : theme.colors.gray_;
      if (data.item.index === 0) {
        borderStyle.borderWidth = tabBarBorder;
        borderStyle.borderRightWidth = 0;
      } else if (data.item.index === length - 1) {
        borderStyle.borderWidth = tabBarBorder;
        borderStyle.borderLeftWidth = 0;
      } else {
        borderStyle.borderWidth = tabBarBorder;
        borderStyle.borderLeftWidth = 0;
        borderStyle.borderRightWidth = 0;
      }
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        onPress={() => this._tabClick(data.item.index)}>
        {/* tabBar内容 */}
        <View
          style={[
            {
              width: this.state.tabBarWith,
            },
            styles.tabBar,
            borderStyle ? borderStyle : null,
            tabBarStyle ? tabBarStyle : null,
            radiusStyle ? radiusStyle : null,
          ]}>
          {/* tabBar选中下标 */}
          {data.item.selected ? (
            <View
              style={[
                styles.tabBarSelected,
                {width: this.state.tabBarWith - 10},
                activeStyle ? activeStyle : null,
              ]}
            />
          ) : null}
          {/* <View> */}
          {data.item.tabComponent ? (
            data.item.tabComponent
          ) : data.item.title ? (
            <Text
              style={[
                {
                  color: data.item.selected
                    ? activeColor
                      ? activeColor
                      : theme.colors.bule
                    : unActiveColor
                    ? unActiveColor
                    : theme.colors.black,
                  fontSize: theme.sizes.content,
                },
              ]}>
              {data.item.title}
            </Text>
          ) : null}
          {/* </View> */}
        </View>
      </TouchableOpacity>
    );
  };

  //渲染tab的容器
  _renderTabContainer() {
    const {tabsConfig} = this.props;
    // 数组
    let itemAry = [];
    // 颜色数组
    // 遍历
    for (let i = 0; i < tabsConfig.length; i++) {
      itemAry.push(
        <View key={i} width={this.state.scrollWidth}>
          {tabsConfig[i].tabContainer}
        </View>,
      );
    }
    return itemAry;
  }

  _tabClick(index) {
    this._tabScrollToIndex(index);
    this._callTarBarOnPress(index);
    //屏幕偏移
    this._scrollView.scrollTo({
      x: index * this.state.scrollWidth,
      y: 0,
      animated: true,
    });
  }

  //回调外部tab点击事件
  _callTarBarOnPress = index => {
    const item = this.state.tabBarArr ? this.state.tabBarArr[index] : {};
    if (item && item.tabBarOnPress) {
      item.tabBarOnPress();
    }
  };

  _onAnimationEnd = e => {
    var offset = e.nativeEvent.contentOffset.x;
    if (offset < 0) {
      return;
    }
    //+1是为了offset大于tabsWidth
    var currentX = Math.floor((offset + 1) / this.state.scrollWidth);
    this._callTarBarOnPress(currentX);
    this._tabScrollToIndex(currentX);
  };

  _tabScrollToIndex(index) {
    this._setIndex(index);
    // var centerX = this.WIDTH / 2.0;
    // var tabOffset = index * (tab_w + tab_marigin);
    // var itemX = tabOffset + tab_w / 2.0;
    // var scrollX = itemX - centerX;
    // if (scrollX < 0) {
    //   scrollX = 0;
    // }
    // if (scrollX >= max_w - this.WIDTH) {
    //   scrollX = max_w - this.WIDTH;
    // }
    // this._flatList.scrollToOffset({offset: scrollX});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarSelected: {
    position: 'absolute',
    width: '100%',
    height: 30,
    padding: 10,
    // height: 2,
    bottom: 5,
    backgroundColor: theme.colors.white,
    borderRadius: 50,
  },
  tabBar: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray_,
  },
});
