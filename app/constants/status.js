import * as theme from './theme';

//巡检任务状态
export const taskStatus = {
  1: {
    id: 1,
    name: '创建',
    color: theme.colors.bule,
  },
  2: {
    id: 2,
    name: '任务中',
    color: theme.colors.orange,
  },
  3: {
    id: 3,
    name: '已完成',
    color: theme.colors.green,
  },
};

//整改状态
export const todoAssessStatus = {
  1: {
    id: 1,
    name: '整改中',
    color: theme.colors.orange,
  },
  2: {
    id: 2,
    name: '整改完成',
    color: theme.colors.green,
  },
  3: {
    id: 3,
    name: '已评定',
    color: theme.colors.violet,
  },
};

//警告等级
export const alertLevels = {
  1: {
    id: 1,
    name: '安全',
    color: theme.colors.alertColor1,
    // type: 'image',
    // image: require('../assets/img/alert1.png'),
  },
  2: {
    id: 2,
    name: '一般隐患',
    color: theme.colors.alertColor2,
    // type: 'image',
    // image: require('../assets/img/alert2.png'),
  },
  3: {
    id: 3,
    name: '严重隐患',
    color: theme.colors.alertColor3,
    // type: 'image',
    // image: require('../assets/img/alert3.png'),
  },
  4: {
    id: 4,
    name: '报警',
    color: theme.colors.alertColor4,
    type: 'image',
    image: require('../assets/img/alert4.png'),
  },
};

//隐患警告等级
export const dangerLevels = {
  2: {
    id: 2,
    name: '一般隐患',
    color: theme.colors.alertColor2,
    // type: 'image',
    // image: require('../assets/img/alert2.png'),
  },
  3: {
    id: 3,
    name: '严重隐患',
    color: theme.colors.alertColor3,
    // type: 'image',
    // image: require('../assets/img/alert3.png'),
  },
  4: {
    id: 4,
    name: '报警',
    color: theme.colors.alertColor4,
    type: 'image',
    image: require('../assets/img/alert4.png'),
  },
};

export const nodeEnv = {
  1: {
    id: 1,
    name: '住宅',
  },
  2: {
    id: 2,
    name: '商业',
  },
  3: {
    id: 3,
    name: '工业',
  },
};

//隐患问题分类
export const analyseTypes = {
  1: {
    id: 1,
    name: '线路问题',
    type: 'image',
    image: require('../assets/img/danger1.png'),
    size: 50,
  },
  2: {
    id: 2,
    name: '设备问题',
    type: 'image',
    image: require('../assets/img/danger2.png'),
    size: 50,
  },
  3: {
    id: 3,
    name: '接线问题',
    type: 'image',
    image: require('../assets/img/danger3.png'),
    size: 50,
  },
};
