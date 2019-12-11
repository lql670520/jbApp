/**
 * 选择框控件：适配IOS,ANDROID
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Platform,
  BackHandler,
  Animated,
  Easing,
} from 'react-native';
import Picker from 'react-native-picker';
import PropTypes from 'prop-types';
import {theme} from '../../constants';

export default class PickerBase extends Component {
  static propTypes = {
    cancel: PropTypes.string, //取消按钮
    title: PropTypes.string, //中间标题
    confirm: PropTypes.string, //确认按钮
    callBackValue: PropTypes.func, //确认值回调方法
    createData: PropTypes.func, //创建数据回调方法
    pickerBg: PropTypes.array, //背景颜色
    synchronousRefresh: PropTypes.bool, //是否同步刷新
  };

  static defaultProps = {
    cancel: '取消',
    title: '请选择',
    confirm: '确认',
    pickerBg: [255, 255, 255, 1],
    // startYear: new Date().getFullYear() - 10, //前10
    // endYear: new Date().getFullYear() + 10, //后10
    synchronousRefresh: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      xPosition: new Animated.Value(0),
      isShow: false, //弹框是否显示
      selectedValue: [], //选择的值  address: ['河北', '唐山', '古冶区']   date: ['2018', '1', '1']
    };
  }

  /**
   *  在外部调用 显示
   * @param pickedValue ['2018', '1', '1']
   */
  _show = pickedValue => {
    if (!this.state.isShow) {
      this.state.selectedValue = pickedValue;
      this._showPicker();
      this.showAnimal();
      this.state.isShow = true;
    }
  };

  /**
   * 确认值
   * @param pickedValue  ['2018', '1', '1']
   */
  confirmValue(pickedValue) {
    this.props.callBackValue && this.props.callBackValue(pickedValue);
  }
  //显示picker
  _showPicker() {
    // console.log('show', this.props.createData());
    Picker.init({
      pickerData: this.props.createData(),
      selectedValue: this.state.selectedValue,
      pickerFontColor: [0, 0, 0, 1],
      onPickerConfirm: (pickedValue, pickedIndex) => {
        this.confirmValue(pickedValue);
        this.hide();
      },
      onPickerCancel: (pickedValue, pickedIndex) => {
        this.hide();
      },
      onPickerSelect: (pickedValue, pickedIndex) => {
        if (this.props.synchronousRefresh) {
          this.confirmValue(pickedValue);
        }
      },
      pickerBg: this.props.pickerBg,
      pickerCancelBtnText: this.props.cancel,
      pickerConfirmBtnText: this.props.confirm,
      pickerTitleText: this.props.title,
      ...this.props,
    });
    Picker.show();
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    if (this.state.isShow) {
      this.hide();
      return true;
    }
    return false;
  };

  /**
   * 隐藏地址
   */
  hide() {
    if (this.state.isShow) {
      Picker.hide();
      this.hideAnimal();
      this.state.isShow = false;
    }
  }

  showAnimal() {
    Animated.timing(this.state.xPosition, {
      toValue: 1,
      easing: Easing.linear,
      duration: 300,
    }).start();
  }
  hideAnimal() {
    Animated.timing(this.state.xPosition, {
      toValue: 0,
      easing: Easing.linear,
      duration: 200,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.contain,
          {
            transform: [
              {
                translateY: this.state.xPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [theme.deviceInfo.height, 0],
                }),
              },
            ],
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    width: theme.deviceInfo.width,
    height: theme.deviceInfo.height,
    position: 'absolute',
    opacity: 0.3,
    left: 0,
    bottom: 0,
  },
});
