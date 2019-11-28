import React, {Component} from 'react';
import {ImageBackground} from 'react-native';
import Block from './Block';
import {theme} from '../../constants';
// import Loading from '../../components/MyLoading';

export default class Container extends Component {
  render() {
    const {imageBackground, color} = this.props;
    return (
      <Block>
        <Block {...this.props} color={theme.colors[color]}>
          {imageBackground === false ? (
            this.props.children
          ) : (
            <ImageBackground
              source={require('../../assets/img/bg.png')}
              style={theme.deviceInfo}>
              {this.props.children}
            </ImageBackground>
          )}
        </Block>

        {/* <Loading /> */}
      </Block>
    );
  }
}
