import React, {Component} from 'react';
import {
  DeviceEventEmitter,
  Dimensions,
  LayoutAnimation,
  Platform,
  Text,
  UIManager,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const window = Dimensions.get('window');

export const ToastPosition = {bottom: 20, center: 2.2, top: 0};
export const DURATION = {
  LENGTH_SHORT: 2000,
  LENGTH_NORMAL: 3000,
  LENGTH_LOG: 4000,
};
export default class Toast extends Component {
  static propTypes = {
    position: PropTypes.number,
    duration: PropTypes.number,
  };

  // 构造
  constructor(props) {
    super(props);

    this.toastCloseNum = 0;
    this.toastCloseNumOld = 0;
    // 初始状态
    this.state = {
      toastR: window.width,
      toastMessage: '',
    };
  }

  componentDidMount() {
    this.toastListner = DeviceEventEmitter.addListener('toast', text => {
      this.showToast(text);
    });
  }

  componentWillUnmount() {
    this.toastListner && this.toastListner.remove();
    this.timer && clearTimeout(this.timer);
  }

  /**
   * show toast
   * @param msj
   */
  showToast(msj) {
    let state = this.state;
    if (!state.toastR && state.toastMessage !== msj) {
      this.toastCloseNum += 1;
      this.anim();
      this.setState({
        toastR: window.width,
      });

      this.timer = setTimeout(() => {
        this.anim();
        this.setState({
          toastR: null,
          toastMessage: msj,
        });
      }, 300);
      this.closeToast();
    } else if (state.toastR) {
      this.toastCloseNum += 1;

      this.anim();
      this.setState({
        toastR: null,
        toastMessage: msj,
      });
      this.closeToast();
    }
  }

  /**
   * toast close
   */
  closeToast() {
    this.timer = setTimeout(() => {
      this.toastCloseNumOld += 1;
      if (this.toastCloseNumOld === this.toastCloseNum) {
        this.toastCloseNumOld = 0;
        this.toastCloseNum = 0;
        this.anim();
        this.setState({
          toastR: window.width,
        });
      }
    }, this.props.duration || DURATION.LENGTH_NORMAL);
  }

  /**
   * set动画效果
   */
  anim() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'black',
          minWidth: 100,
          paddingRight: 20,
          paddingLeft: 10,
          paddingTop: 10,
          paddingBottom: 10,
          marginRight: 20,
          minHeight: 50,
          borderBottomRightRadius: 50,
          borderTopRightRadius: 50,
          position: 'absolute',
          justifyContent: 'center',
          right: this.state.toastR,
          alignItems: 'center',
          opacity: 0.9,
          bottom: window.height / (this.props.position || ToastPosition.bottom),
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            backgroundColor: 'transparent',
          }}>
          {this.state.toastMessage}
        </Text>
      </View>
    );
  }
}
