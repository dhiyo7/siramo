import { observable, computed } from 'mobx'
import { db, User } from './firebase'
import { Alert } from 'react-native'
import firebase from 'firebase'

class UserStore {
  @observable userData = {
    uid: '',
    email: '',
    loading: false
  }

  @observable farmData = {
    name: '',
    temperature: 0,
    water_ratio: 0,
    water_level: 0,
    humidity: 0,
    last_siram: 0,
    last_updated: 0,
    ready_siram: 2,
    loading: false
  }

  @observable isLogin = false

  getFarmData = () => {
    let userId = this.userData.uid
    this.farmData.loading = true
    db.ref(`/farms/${userId}`).on('value', snap => {
      try {
        let farmDB = snap.val()
        console.log('Farm Data ===>', farmDB.last_siram)
        this.farmData.name = farmDB.name
        this.farmData.temperature = farmDB.temperature
        this.farmData.water_ratio = farmDB.water_ratio
        this.farmData.water_level = farmDB.water_level
        this.farmData.humidity = farmDB.humidity
        this.farmData.last_siram = farmDB.last_siram
        this.farmData.last_updated = farmDB.last_updated
        this.farmData.ready_siram = farmDB.ready_siram
        this.farmData.loading = false
      } catch (error) {
        console.log(error)
      }
      
    })
  }

  assignUserData = (data) => {
    this.userData.uid = data.uid
    this.userData.email = data.email
  }

  firebaseLogin = (data, navigation) => {
    this.userData.loading = true
    User.signInWithEmailAndPassword(data.email, data.password)
      .then(response => {
        console.log(response.user.uid)
        if (response.user) {
          this.userData.uid = response.user.uid
          this.userData.email = response.user.email
          this.isLogin = true
          this.userData.loading = false
          this.getFarmData()
          console.log(this.userData)
          console.log(this.isLogin)
          navigation.navigate('Home')
        }
      })
      .catch(err => {
        Alert.alert(err.code, err.message)
        this.userData.loading = false
      })
  }

  firebaseSignUp = (data, navigation) => {
    console.log("Masuk sini ?")
    this.userData.loading = true
    User.createUserWithEmailAndPassword(data.email, data.password)
      .then(response => {1
        console.log('Response Daftar', response.user.uid)
        if (response.user) {
          this.userData.uid = response.user.uid
          this.userData.email = response.user.email
          this.isLogin = true
          this.userData.loading = false
          navigation.navigate('Home')
        }
        // nanti bikin db baru di firebase kalo mau ada name alamat dll
      })
      .catch(err => {
        Alert.alert(err.code, err.message)
        this.userData.loading = false
      })
  }

  firebaseSignOut = (data, navigation) => {
    // pasang alert di sini atau di component ny nanti
    User.signOut()
      .then(() => {
        this.assignUserData({uid:'',email:''})
        console.log('Logout')
      })
      .catch(err => {
        console.log(err)
        Alert.alert(err.code, err.message)
      })
  }

  triggerSiram = () => {
    console.log('Kepanggil ?')
    let userId = this.userData.uid
    let ready_siram = this.farmData.ready_siram
    if (ready_siram === 0) {
      ready_siram = 1
    } else {
      ready_siram = 0
    }

    let farmUpdate = {
      ready_siram: ready_siram,
      last_siram: firebase.database.ServerValue.TIMESTAMP,
      last_updated: firebase.database.ServerValue.TIMESTAMP
    }
    db.ref(`/farms/${userId}`).update(farmUpdate)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log('Error', err)
      })
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

    return (date < 10)? `0${date} ${months[month]} ${year}`: `${date} ${months[month]} ${year}, ${hours}:${minute}`
  }
}

const userStore = new UserStore() 
export default userStore