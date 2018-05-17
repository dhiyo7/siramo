// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { createStackNavigator } from 'react-navigation'
// import Farm from './src/components/Farm'
// import AddFarm from './src/components/AddFarm'

// const Navigator = createStackNavigator({
//   Farm:{
//     screen:Farm,
//     navigationOptions: {
//       headerTitle: 'Farm',
//     }
//   },
//   AddFarm:{
//     screen:AddFarm,
//     navigationOptions: {
//       headerTitle: 'AddFarm'
//     }
//   }
// },{
//   initialRouteName: 'Farm',
// })
import React from 'react'
import { Provider } from 'mobx-react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import RootStack from './src/components/stack/RootStack'
import UserStore from './src/store/UserStore'

export default class App extends React.Component {
  render() {
    return (
      <Provider UserStore={UserStore}>
        <RootStack />
      </Provider>
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
