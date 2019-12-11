import {Dimensions} from 'react-native';

const colors = {
  alertColor1: '#2BC66A',
  alertColor2: '#807FFF',
  alertColor3: '#FFA835',
  alertColor4: '#FF697A',
  // alertColor1: 'linear-gradient(-41deg, #2842EF 0%, #00BED0 100%)',
  // alertColor2: 'linear-gradient(-41deg, #723AF1 0%, #BC92FF 100%)',
  // alertColor3: 'linear-gradient(-35deg, #FD9240 0%, #FFBE5A 100%)',
  // alertColor4: 'linear-gradient(-35deg, #FD4061 0%, #FF705A 100%)',

  primary: '#3b7fff',
  accent: '#2842EF',
  // secondary: '#2BDA8E',
  // tertiary: '#FFE358',
  black: '#1d1d1d',
  white: '#FFFFFF',
  bule: '#286aff',
  red: '#FF697A',
  green: '#2bc669',
  orange: '#ffa835',
  violet: '#807fff',
  gray: 'rgba(48,68,74,.5)',
  gray1: 'rgba(48,68,74,.8)',
  gray2: 'rgba(48,68,74,.2)',
  gray3: 'hsla(0,0%,100%,.8)',
  gray4: 'rgba(238,240,245,0.8)',
  gray5: '#f5f5f9',
  gray_bg: '#eaedf7',
  gray_: '#dfdfef',

  delete: '#e94f4f',
  edit: '#108ee9',
  info: 'rgb(241, 151, 54)',
};

const sizes = {
  // global sizes

  base: 18,
  font: 16,
  radius: 6,
  padding: 25,

  // font sizes
  h1: 30,
  h2: 26,
  h3: 18,
  h4: 90,
  h5: 28,

  barTitle: 20,
  title: 20,
  header: 18,
  content: 16,
  body: 14,
  caption: 12,
};

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  h4: {
    fontSize: sizes.h4,
  },
  h5: {
    fontSize: sizes.h5,
  },
  content: {
    fontSize: sizes.content,
  },
  header: {
    fontSize: sizes.header,
  },
  title: {
    fontSize: sizes.title,
  },
  barTitle: {
    fontSize: sizes.barTitle,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
};

//屏幕大小
const deviceInfo = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

//点击透明度
const activeOpacity = 1;

export {colors, sizes, fonts, deviceInfo, activeOpacity};
