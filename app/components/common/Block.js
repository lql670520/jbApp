import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';

import {theme} from '../../constants';

export default class Block extends Component {
  handleMargins() {
    const {margin} = this.props;
    if (typeof margin === 'number') {
      return {
        marginTop: margin,
        marginRight: margin,
        marginBottom: margin,
        marginLeft: margin,
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: margin[0],
            marginRight: margin[0],
            marginBottom: margin[0],
            marginLeft: margin[0],
          };
        case 2:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[0],
            marginLeft: margin[1],
          };
        case 3:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[1],
          };
        default:
          return {
            marginTop: margin[0],
            marginRight: margin[1],
            marginBottom: margin[2],
            marginLeft: margin[3],
          };
      }
    }
  }

  handlePaddings() {
    const {padding} = this.props;
    if (typeof padding === 'number') {
      return {
        paddingTop: padding,
        paddingRight: padding,
        paddingBottom: padding,
        paddingLeft: padding,
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: padding[0],
            paddingRight: padding[0],
            paddingBottom: padding[0],
            paddingLeft: padding[0],
          };
        case 2:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[0],
            paddingLeft: padding[1],
          };
        case 3:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[1],
          };
        default:
          return {
            paddingTop: padding[0],
            paddingRight: padding[1],
            paddingBottom: padding[2],
            paddingLeft: padding[3],
          };
      }
    }
  }

  handleborders() {
    const {border} = this.props;
    if (typeof border === 'number') {
      return {
        borderWidth: border,
        borderColor: theme.colors.gray,
      };
    }

    if (typeof border === 'object') {
      const borderSize = Object.keys(border).length;
      switch (borderSize) {
        case 1:
          return {
            borderTopWidth: border[0],
            borderRightWidth: border[0],
            borderBottomWidth: border[0],
            borderLeftWidth: border[0],
            borderColor: theme.colors.gray,
          };
        case 2:
          return {
            borderTopWidth: border[0],
            borderRightWidth: border[1],
            borderBottomWidth: border[0],
            borderLeftWidth: border[1],
            borderColor: theme.colors.gray,
          };
        case 3:
          return {
            borderTopWidth: border[0],
            borderRightWidth: border[1],
            borderBottomWidth: border[2],
            borderLeftWidth: border[1],
            borderColor: theme.colors.gray,
          };
        default:
          return {
            borderTopWidth: border[0],
            borderRightWidth: border[1],
            borderBottomWidth: border[2],
            borderLeftWidth: border[3],
            borderColor: theme.colors.gray,
          };
      }
    }
  }

  render() {
    const {
      noFlex,
      flex,
      height,
      width,
      overflow,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      relative,
      absolute,
      card,
      border,
      borderColor,
      borderRadius,
      shadow,
      color,
      space,
      padding,
      margin,
      animated,
      touchableOpacity,
      wrap,
      style,
      children,
      header,
      ...props
    } = this.props;

    const blockStyles = [
      !noFlex && styles.block,
      flex && {flex},
      flex === false && {flex: 0},
      height && {height: height},
      width && {width: width},
      overflow && {overflow: overflow},
      header && {height: 50},
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      relative && {position: 'relative', ...relative},
      absolute && {position: 'absolute', ...absolute},
      margin && {...this.handleMargins()},
      padding && {...this.handlePaddings()},
      border && {...this.handleborders()},
      borderColor && {
        borderColor: borderColor
          ? theme.colors[borderColor]
            ? theme.colors[borderColor]
            : borderColor
          : theme.colors.gray,
      },
      card && styles.card,
      border && styles.border,
      borderRadius && {borderRadius: borderRadius},
      shadow && styles.shadow,
      space && {justifyContent: `space-${space}`},
      wrap && {flexWrap: 'wrap'},
      color && styles[color],
      color && !styles[color] && {backgroundColor: color},
      style, //重定义样式
    ];

    if (animated) {
      return (
        <Animated.View style={blockStyles} {...props}>
          {children}
        </Animated.View>
      );
    }

    if (touchableOpacity) {
      return (
        <TouchableOpacity
          activeOpacity={theme.activeOpacity}
          style={[blockStyles]}
          {...props}>
          {children}
        </TouchableOpacity>
      );
    }

    return (
      <View
        activeOpacity={theme.activeOpacity}
        style={[blockStyles]}
        {...props}>
        {children}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: theme.sizes.radius,
  },

  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },
  //颜色
  alertColor1: {backgroundColor: theme.colors.alertColor1},
  alertColor2: {backgroundColor: theme.colors.alertColor2},
  alertColor3: {backgroundColor: theme.colors.alertColor3},
  alertColor4: {backgroundColor: theme.colors.alertColor4},
  primary: {backgroundColor: theme.colors.primary},
  delete: {backgroundColor: theme.colors.delete},
  edit: {backgroundColor: theme.colors.edit},
  info: {backgroundColor: theme.colors.info},
  black: {backgroundColor: theme.colors.black},
  white: {backgroundColor: theme.colors.white},
  green: {backgroundColor: theme.colors.green},
  red: {backgroundColor: theme.colors.red},
  violet: {backgroundColor: theme.colors.violet},
  bule: {backgroundColor: theme.colors.bule},
  gray: {backgroundColor: theme.colors.gray},
  gray1: {backgroundColor: theme.colors.gray1},
  gray2: {backgroundColor: theme.colors.gray2},
  gray3: {backgroundColor: theme.colors.gray3},
  gray4: {backgroundColor: theme.colors.gray4},
  gray5: {backgroundColor: theme.colors.gray5},
  gray_bg: {backgroundColor: theme.colors.gray_bg},
  gray_: {backgroundColor: theme.colors.gray_},
});
