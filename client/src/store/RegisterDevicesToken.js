import { Permissions, Notifications } from 'expo'
import userStore from '../store/UserStore'

export default async function registerForPushNotificationsAsync() {
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

  userStore.userData.token = token
}