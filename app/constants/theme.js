import {Dimensions} from 'react-native';

const colors = {
  alertColor1: '#2842EF',
  alertColor2: '#723AF1',
  alertColor3: '#FD9240',
  alertColor4: '#FD4061',
  // alertColor1: 'linear-gradient(-41deg, #2842EF 0%, #00BED0 100%)',
  // alertColor2: 'linear-gradient(-41deg, #723AF1 0%, #BC92FF 100%)',
  // alertColor3: 'linear-gradient(-35deg, #FD9240 0%, #FFBE5A 100%)',
  // alertColor4: 'linear-gradient(-35deg, #FD4061 0%, #FF705A 100%)',

  primary: '#3b7fff',
  accent: '#2842EF',
  // secondary: '#2BDA8E',
  // tertiary: '#FFE358',
  black: '#323643',
  white: '#FFFFFF',
  gray: 'rgba(48,68,74,.5)',
  gray1: 'rgba(48,68,74,.8)',
  gray2: 'rgba(48,68,74,.2)',
  gray3: 'hsla(0,0%,100%,.8)',
  gray4: 'rgba(238,240,245,0.8)',
  gray5: '#f5f5f9',

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
  h2: 20,
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

//警告等级
const alertLevelMap = {
  1: {
    name: '安全',
    // icon: icon1,
    color: '#61CD00',
    rgb: '97,205,0',
  },
  2: {
    name: '一般隐患',
    // icon: icon2,
    color: '#8E8DFB',
    rgb: '142,141,251',
  },
  3: {
    name: '严重隐患',
    // icon: icon3,
    color: '#FFAE46',
    rgb: '255,174,70',
  },
  4: {
    name: '报警',
    // icon: icon4,
    color: '#FF6D7B',
    rgb: '255,109,123',
  },
};

export {colors, sizes, fonts, deviceInfo, activeOpacity, alertLevelMap};
