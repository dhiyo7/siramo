import React from 'react'
// import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import RootStack from './src/components/stack/RootStack'


export default class App extends React.Component {
  render() {
    return (
      <RootStack />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151e2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
