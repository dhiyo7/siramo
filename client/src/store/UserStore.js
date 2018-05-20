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
    return new Promise((resolve, reject) => {
      this.userData.uid = data.uid
      this.userData.email = data.email
      resolve(this.userData)
      reject('error')
    })
  }

  firebaseLogin = (data, navigation) => {
    this.userData.loading = true
    User.signInWithEmailAndPassword(data.email, data.password)
      .then(response => {
        // console.log(response.user.uid)
        if (response.user) {
          this.userData.uid = response.user.uid
          this.userData.email = response.user.email
          this.isLogin = true
          this.userData.loading = false
          FarmStore.getFarmData()
          AsyncStorage.setItem('userId', response.user.uid)
          AsyncStorage.setItem('email', response.user.email)
          navigation.navigate('Home')
        }
      })
      .catch(err => {
        Alert.alert(err.code, err.message)
        this.userData.loading = false
      })
  }

  firebaseSignUp = (data, navigation) => {
    this.userData.loading = true
    User.createUserWithEmailAndPassword(data.email, data.password)
      .then(response => {1
        if (response.user) {
          this.userData.uid = response.user.uid
          this.userData.email = response.user.email
          this.isLogin = true
          this.userData.loading = false
          FarmStore.getFarmData()
          AsyncStorage.setItem('userId', response.user.uid)
          AsyncStorage.setItem('email', response.user.email)
          navigation.navigate('Home')
        }
      })
      .catch(err => {
        Alert.alert(err.code, err.message)
        this.userData.loading = false
      })
  }

  firebaseSignOut = async () => {
    try {
      await AsyncStorage.removeItem('userId')
      await AsyncStorage.removeItem('email')
      User.signOut()
      .then(() => {
        this.assignUserData({uid:'',email:''})
        FarmStore.clearAll()
      })
      .catch(err => {
        console.log(err)
        Alert.alert(err.code, err.message)
      })
    } catch (error) {
      Alert.alert(error.message)
    }
   
  }

  dateFormat = (times) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let date = new Date(times).getDate()
    let month = new Date(times).getMonth()
    let year = new Date(times).getFullYear()
    let minute = new Date(times).getMinutes()
    let hours = new Date(times).getHours()
    // (minute < 10)? minute = `0${minute}`: minute = `${minute}`
    // (hours < 10)? hours = `0${hours}`: hours = `${hours}`

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