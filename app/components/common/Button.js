import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../../constants';

class Button extends Component {
  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      semiCircle,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      semiCircle && styles.semiCircle,
      shadow && styles.shadow,
      color && styles[color],
      color && !styles[color] && {backgroundColor: color},
      style,
    ];

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || theme.activeOpacity}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  semiCircle: {borderRadius: 500},

  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: {backgroundColor: theme.colors.accent},
  primary: {backgroundColor: theme.colors.primary},
  black: {backgroundColor: theme.colors.black},
  white: {backgroundColor: theme.colors.white},
  gray: {backgroundColor: theme.colors.gray},
  gray2: {backgroundColor: theme.colors.gray2},
});
