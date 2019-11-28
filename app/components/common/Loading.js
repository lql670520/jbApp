import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

/**
 * 加载控件
 */
class Loading extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    textStyle: PropTypes.any,
    loadingStyle: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.handle = 0;
  }

  componentWillUnmount() {
    clearTimeout(this.handle);
  }

  render() {
    clearTimeout(this.handle);
    const loadingState = this.props.loadingState;

    //关闭
    // loadingState.timeout !== defaultTimeOut &&
    //   (this.handle = setTimeout(() => {
    //     // console.log(loadingState.timeout);
    //     this.props.loading({isShow: false});
    //   }, loadingState.timeout));

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={loadingState.isShow}
        onRequestClose={() => {
          //关闭
          // alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View style={[styles.load_box, this.props.loadingStyle]}>
            <ActivityIndicator
              animating={true}
              color={this.props.color || '#FFF'}
              size={'large'}
              style={styles.load_progress}
            />
            <Text style={[styles.load_text, this.props.textStyle]}>
              {loadingState.text}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  load_box: {
    width: 100,
    height: 100,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  load_progress: {
    width: 50,
    height: 50,
  },
  //默认字体颜色
  load_text: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(178,178,178,0.1)',
  },
});

export default connect(({init}) => ({loadingState: init.loadding}))(Loading);
