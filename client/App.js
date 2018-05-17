import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import Farm from './src/components/Farm'
import AddFarm from './src/components/AddFarm'

const Navigator = createStackNavigator({
  Farm:{
    screen:Farm,
    navigationOptions: {
      headerTitle: 'Farm',
    }
  },
  AddFarm:{
    screen:AddFarm,
    navigationOptions: {
      headerTitle: 'AddFarm'
    }
  }
},{
  initialRouteName: 'Farm',
})

export default class App extends React.Component {
  render() {
    return (
     <Navigator/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
