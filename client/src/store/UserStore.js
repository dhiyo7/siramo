import { observable, computed } from 'mobx'
import { db, User } from './firebase'
import { Alert } from 'react-native'

class UserStore {
  @observable userData = {
    uid: '',
    email: ''
  }

  @observable isLogin = false

  firebaseLogin = (data, navigation) => {
    User.signInWithEmailAndPassword(data.email, data.password)
      .then(response => {
        console.log(response.user.uid)
        if (response.user) {
          this.userData.uid = response.user.uid
          this.userData.email = response.user.email
          this.isLogin = true
          console.log(this.userData)
          console.log(this.isLogin)
          navigation.navigate('Home')
        }
      })
      .catch(err => console.log(err))
  }

  firebaseSignUp = (data, navigation) => {
    // nanti harus bikin loading
    console.log("Masuk sini ?")
    User.createUserWithEmailAndPassword(data.email, data.password)
      .then(response => {
        console.log('Response Daftar', response.user.uid)
        if (response.user) {
          this.userData.uid = response.user.uid
          this.userData.email = response.user.email
          this.isLogin = true
          navigation.navigate('Home')
        }
        // nanti bikin db baru di firebase kalo mau ada name alamat dll
        // kalo berhasil langsung pindah ke home
      })
      .catch(err => {
        Alert.alert(err.code, err.message)
      })
  }

  // Logout Belum
}

const userStore = new UserStore() 
export default userStore