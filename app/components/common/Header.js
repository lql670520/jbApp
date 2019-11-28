import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Text from './Text';
import Block from './Block';
import Icon from './Icon';
import {theme} from '../../constants';

const micons = {
  goback: {
    name: 'ios-arrow-back',
    onPress: props => {
      alert('退出');
      //   navigation.goBack();
    },
  },
  menu: {
    name: 'ios-menu',
    onPress: props => {
      props.onPressMenu && props.onPressMenu();
    },
  },
  message: {
    name: 'md-text',
    onPress: (navigation, props) => {
      alert('消息');
      //   navigation.navigate('MessagePage');
    },
  },
  userAdd: {
    name: 'md-person-add',
    onPress: props => {
      alert('新增联系人');
      // navigation.navigate('MessagePage');
    },
  },
};

class HeaderIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {right, onPressMenu} = this.props;
    const icons = this.props.icons ? this.props.icons : [];
    return (
      <Block row right={right}>
        {icons.map((v, i) => {
          return micons[v] ? (
            <Icon
              key={i}
              name={micons[v].name}
              onPress={() => {
                micons[v].onPress(this.props);
              }}
              style={right ? styles.iconRigth : styles.iconLeft}
              onPressMenu={onPressMenu}
              size={25}
            />
          ) : null;
        })}
      </Block>
    );
  }
}

/**
 *菜单icon
 */
class MenuBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  //点击文本内容
  _handleContent = (path, goPage) => {
    this.setState({showMenu: false});
    if (path) {
      if (goPage) {
        this.props.navigation.navigate(path, {goPage: goPage});
      } else {
        this.props.navigation.navigate(path);
      }
    }
  };
  render() {
    const {menuType} = this.props;
    const mainMenu = [
      {
        title: '修改密码',
        path: 'ReastPasswordPage',
        // goPage: 'HomePage',
        icon: 'ios-key',
      },
      {
        title: '退出',
        path: 'LoginPage',
        icon: 'ios-backspace',
      },
    ];
    const attentionMenu = [
      {
        title: '关注    ',
        // path: 'PasswordPage',
        icon: 'ios-eye',
      },
      {
        title: '取消关注',
        // path: 'LoginPage',
        icon: 'ios-eye-off',
      },
    ];
    let menu = [];
    if (menuType === 'mainMenu') {
      menu = mainMenu;
    } else if (menuType === 'attentionMenu') {
      menu = attentionMenu;
    }
    return (
      <View style={this.props.style ? this.props.style : styles.mebuBolck}>
        {this.state.showMenu && menu.length > 0 ? (
          <View>
            <View style={styles.menuBox}>
              <View style={styles.menuTriangle} />
              <View style={styles.menuUl}>
                {menu.map((v, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.menuLi,
                      i === 0 ? {borderTopWidth: 0} : null,
                    ]}
                    activeOpacity={theme.activeOpacity}
                    onPress={() => {
                      this._handleContent(v.path, v.goPage);
                    }}>
                    <Icon style={styles.menuIcon} name={v.icon} size={18} />
                    <Text content>{v.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : (
          <Text />
        )}
      </View>
    );
  }
}

/**
 * leftIcon 和 rightIcon必须输入,不然title不会居中
 *调用方式：
 */
/* <Header navigation={navigation} leftIcon={['goback']} rightIcon={[]} /> */

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  //是否显示菜单
  _onPressMenu = () => {
    this.setState({showMenu: !this.state.showMenu});
  };

  //左边显示
  _showLeft = () => {
    const {navigation, leftIcon} = this.props;
    return leftIcon ? (
      <HeaderIcon left icons={leftIcon} navigation={navigation} />
    ) : null;
  };

  //右边显示
  _showRight = () => {
    const {navigation, rightIcon} = this.props;
    return rightIcon ? (
      <HeaderIcon
        right
        navigation={navigation}
        icons={rightIcon}
        onPressMenu={() => {
          this._onPressMenu();
        }}
      />
    ) : null;
  };

  render() {
    const {color, noColor, menuType} = this.props;

    return (
      <View>
        <Block
          flex={false}
          color={noColor ? null : color ? color : 'red'}
          header
          row
          center>
          {this._showLeft()}
          <Block>
            <Text center barTitle color="white" numberOfLines={1}>
              {this.props.title}
            </Text>
          </Block>
          {this._showRight()}
        </Block>
        {this.state.showMenu === true ? (
          <MenuBox
            menuType={menuType ? menuType : 'mainMenu'}
            navigation={this.props.navigation}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconLeft: {marginLeft: 15},
  iconRigth: {marginRight: 15},
  mebuBolck: {
    position: 'absolute',
    right: 10,
    top: 40,
    zIndex: 1,
  },
  menuBox: {
    alignItems: 'flex-end',
  },
  menuButton: {
    alignSelf: 'flex-end',
  },

  menuTriangle: {
    width: 8,
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: '#fff',
    position: 'relative',
    right: 7,
    top: 2,
  },
  menuUl: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
  menuLi: {
    flexDirection: 'row',
    borderTopColor: '#e9e9e9',
    borderTopWidth: 1,
    padding: 7,
    marginHorizontal: 5,
    fontSize: 18,
    minWidth: 100,
  },
  menuIcon: {marginRight: 5, color: theme.colors.black},
});
