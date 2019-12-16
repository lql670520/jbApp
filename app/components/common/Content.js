import React, {Component} from 'react';
import {ScrollView} from 'react-native';

import Block from './Block';
import {theme} from '../../constants';

export default class Content extends Component {
  render() {
    return this.props.scrollView ? (
      <Block
        color={this.props.color ? this.props.color : theme.colors.gray_bg}
        {...this.props}>
        <ScrollView>{this.props.children}</ScrollView>
      </Block>
    ) : (
      <Block
        color={this.props.color ? this.props.color : theme.colors.gray_bg}
        {...this.props}>
        {this.props.children}
      </Block>
    );
  }
}
