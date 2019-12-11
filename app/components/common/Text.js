import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

import {theme} from '../../constants';

export default class Typography extends Component {
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

  render() {
    const {
      flex,
      numberOfLines,
      h1,
      h2,
      h3,
      h4,
      h5,
      margin,
      padding,
      barTitle,
      title,
      body,
      caption,
      small,
      content,
      size,
      transform,
      align,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      lineHeight, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      bule,
      red,
      orange,
      violet,
      gray,
      gray1,
      gray2,
      gray3,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      flex && {flex: flex},
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      h4 && styles.h4,
      h5 && styles.h5,
      margin && {...this.handleMargins()},
      padding && {...this.handlePaddings()},
      barTitle && styles.barTitle,
      title && styles.title,
      body && styles.body,
      content && styles.content,
      caption && styles.caption,
      small && styles.small,
      size && {fontSize: size},
      transform && {textTransform: transform},
      align && {textAlign: align},
      lineHeight && {lineHeight: lineHeight},
      spacing && {letterSpacing: spacing},
      weight && {fontWeight: weight},
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && {color},
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      black && styles.black,
      white && styles.white,
      bule && styles.bule,
      red && styles.red,
      orange && styles.orange,
      violet && styles.violet,

      gray && styles.gray,
      gray1 && styles.gray1,
      gray2 && styles.gray2,
      gray3 && styles.gray3,
      style, // rewrite predefined styles
    ];

    return (
      <Text
        style={textStyles}
        {...props}
        numberOfLines={
          numberOfLines === 0 ? 0 : numberOfLines ? numberOfLines : 1
        }>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  //默认颜色
  text: {
    fontSize: theme.sizes.base,
    color: theme.colors.black,
  },
  // variations
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '500',
  },
  medium: {
    fontWeight: '400',
  },
  light: {
    fontWeight: '200',
  },
  // position
  center: {textAlign: 'center'},
  right: {textAlign: 'right'},
  // 颜色

  alertColor1: {color: theme.colors.alertColor1},
  alertColor2: {color: theme.colors.alertColor2},
  alertColor3: {color: theme.colors.alertColor3},
  alertColor4: {color: theme.colors.alertColor4},
  primary: {color: theme.colors.primary},
  accent: {color: theme.colors.accent},
  black: {color: theme.colors.black},
  white: {color: theme.colors.white},
  bule: {color: theme.colors.bule},
  red: {color: theme.colors.red},
  orange: {color: theme.colors.orange},
  violet: {color: theme.colors.violet},
  green: {color: theme.colors.green},
  gray: {color: theme.colors.gray},
  gray1: {color: theme.colors.gray1},
  gray2: {color: theme.colors.gray2},
  gray3: {color: theme.colors.gray3},
  // 字体
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  h4: theme.fonts.h4,
  h5: theme.fonts.h5,
  barTitle: theme.fonts.barTitle,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small,
  content: theme.fonts.content,
});
