import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class DevicesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text
          onPress={() => {
            Actions.popTo('loginPage');
          }}>
          {'DevicesPage'}
        </Text>
      </View>
    );
  }
}
