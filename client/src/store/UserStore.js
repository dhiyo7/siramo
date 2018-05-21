import { observable, computed } from 'mobx'
import { db, User } from './firebase'
import { Alert } from 'react-native'
import firebase from 'firebase'
import { AsyncStorage } from 'react-native'
import FarmStore from '../store/FarmStore'

class UserStore {
  @observable userData = {
    uid: '',
    email: '',
    loading: false
  }

  @observable isLogin = false
 
  assignUserData = (data) => {
      this.userData.uid = data.uid
      this.userData.email = data.email
  }

  firebaseLogin = (data, navigation) => {
    return new Promise((resolve, reject) => {
      this.userData.loading = true
      User.signInWithEmailAndPassword(data.email, data.password)
        .then( async(response) => {
          // console.log(response.user.uid)
          if (response.user) {
            this.userData.uid = response.user.uid
            this.userData.email = response.user.email
            this.isLogin = true
            this.userData.loading = false
            await FarmStore.getFarmData()
            AsyncStorage.setItem('userId', response.user.uid)
            AsyncStorage.setItem('email', response.user.email)
            navigation.navigate('Home')
            resolve()
          }
        })
        .catch(err => {
          Alert.alert(err.code, err.message)
          this.userData.loading = false
          reject(err)
        })
    })
    
  }

  firebaseSignUp = (data, navigation) => {
    return new Promise((resolve, reject) => {
      this.userData.loading = true
      User.createUserWithEmailAndPassword(data.email, data.password)
        .then(response => {
          if (response.user) {
            this.userData.uid = response.user.uid
            this.userData.email = response.user.email
            this.isLogin = true
            this.userData.loading = false
            // FarmStore.getFarmData()
            AsyncStorage.setItem('userId', response.user.uid)
            AsyncStorage.setItem('email', response.user.email)
            navigation.navigate('Home')
            resolve()
          }
        })
        .catch(err => {
          Alert.alert(err.code, err.message)
          this.userData.loading = false
          reject()
        })
    })
  
  }

  firebaseSignOut = async () => {

    return new Promise( async(resolve, reject) => {
      try {
        await AsyncStorage.removeItem('userId')
        await AsyncStorage.removeItem('email')
        User.signOut()
        .then( async() => {
          this.assignUserData({uid:'',email:''})
          await FarmStore.clearAll()
          resolve()
        })
        .catch(err => {
          console.log(err)
          Alert.alert(err.code, err.message)
          reject(err)
        })
      } catch (error) {
        Alert.alert(error.message)
      }
    })
  }

  dateFormat = (times) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(times).getDate()
    let month = new Date(times).getMonth()
    let year = new Date(times).getFullYear()
    let minute = new Date(times).getMinutes()
    let hours = new Date(times).getHours()

    return (date < 10)? `0${date} ${months[month]} ${year}`: `${date} ${months[month]} ${year}`
  }

  timeFormat = (times) => {
    let minute = new Date(times).getMinutes()
    let hours = new Date(times).getHours()
    if (hours < 10) {
      hours = `0${hours}`
    }
    if (minute < 10) {
      minute = `0${minute}`
    }

    return `${hours}:${minute}`
  }
}

const userStore = new UserStore() 
export default userStore