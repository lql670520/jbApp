import React, {Component} from 'react';
import {StyleSheet, TextInput} from 'react-native';
// import {Icon} from 'expo';

import Text from './Text';
import Block from './Block';
import {theme} from '../../constants';

export default class Input extends Component {
  state = {
    toggleSecure: false,
  };

  renderLabel() {
    const {label} = this.props;
    return (
      <Block flex={false} padding={[0, 5, 0, 15]}>
        {label ? <Text gray2>{label}</Text> : null}
      </Block>
    );
  }
  render() {
    const {style, border, ...props} = this.props;
    const inputStyles = [styles.input, style];
    const inputBorder = border ? border : [0, 0, 1, 0];
    return (
      <Block
        flex={false}
        padding={[0, 0]}
        row
        center
        border={inputBorder}
        borderColor="gray2">
        {this.renderLabel()}
        <TextInput style={inputStyles} {...props} />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: theme.sizes.base,
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
  },
});
