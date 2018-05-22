import React from 'react'
import { Provider } from 'mobx-react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import RootStack from './src/components/stack/RootStack'
import UserStore from './src/store/UserStore'
import FarmStore from './src/store/FarmStore'
import { db } from './src/store/firebase'
import { Permissions, Notifications } from 'expo'
import userStore from './src/store/UserStore';

async function registerForPushNotificationsAsync() {
  const {status: existingStatus} = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return
  }

  let token = await Notifications.getExpoPushTokenAsync()
  // console.log(token)
  // let uid = userStore.userData.uid
  userStore.userData.token = token
  // if (uid) {
  //   db.ref(`/farms/${uid}`).update({token})
  // }
}

export default class App extends React.Component {
  componentWillMount() {
    registerForPushNotificationsAsync()

  }
  
  render() {
    return (
      <Provider UserStore={UserStore} FarmStore={FarmStore}>
        <RootStack/>
      </Provider>
    )
  }
}