import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import Content from './Content';
import {theme} from '../../constants';

export default class TabContent extends Component {
  render() {
    const {color} = this.props;
    return (
      <Content color={color ? color : theme.colors.white} margin={[0, 10]}>
        <ScrollView>{this.props.children}</ScrollView>
      </Content>
    );
  }
}
