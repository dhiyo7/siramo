import React from 'react'
import { Provider } from 'mobx-react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import RootStack from './src/components/stack/RootStack'
import UserStore from './src/store/UserStore'
import FarmStore from './src/store/FarmStore'
import { db } from './src/store/firebase'
<<<<<<< HEAD
import registerForPushNotificationsAsync from './src/store/RegisterDevicesToken'
// import { Permissions, Notifications } from 'expo'
import userStore from './src/store/UserStore'

// async function registerForPushNotificationsAsync() {
//   const {status: existingStatus} = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   )
//   let finalStatus = existingStatus
//   if (existingStatus !== 'granted') {
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
//     finalStatus = status
//   }

//   if (finalStatus !== 'granted') {
//     return
//   }

//   let token = await Notifications.getExpoPushTokenAsync()

//   userStore.userData.token = token
// }
=======
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
>>>>>>> bf816fc197b49f328f8b55da96e983f4cd6a27c5

export default class App extends React.Component {
  componentWillMount() {
    registerForPushNotificationsAsync()
<<<<<<< HEAD
=======
    // this.listener = Notification.addListener(this.listen)
>>>>>>> bf816fc197b49f328f8b55da96e983f4cd6a27c5
  }
  
  render() {
    return (
      <Provider UserStore={UserStore} FarmStore={FarmStore}>
        <RootStack/>
      </Provider>
    )
  }
}