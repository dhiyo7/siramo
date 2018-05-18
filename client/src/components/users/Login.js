import React, { Component } from 'react'
import { 
  View, Text, TextInput,
  StyleSheet, TouchableOpacity, Alert, Image
} from 'react-native'
import { inject, observer } from 'mobx-react'
import Loader from '../customs/Loader'
// import { User, Fire } from '../../store/firebase'
// import SignUp from './SignUp'
import UserStore from '../../store/UserStore'

const background = require('../../assets/logo/Drawing1-ModelEdit.png')

@inject('UserStore')
@observer class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  static navigationOptions = {
    header: null
  }
  submitLogin = () => {
    let email = this.state.email
    let password = this.state.password
    
    if (!email) {
      Alert.alert('Sorry!','Please fill your Email')
    } else if (!password) {
      Alert.alert('Sorry!','Please fill your Password')
    } else {
      let navigation = this.props.navigation
      UserStore.firebaseLogin({email, password}, navigation)
    }
  }

  // tambahan kalo bisa, belum bisa sampe sekarang
  googleLogin = () => {
    console.log('login Google')
    let provider = new Fire.auth.GoogleAuthProvider()
    User.signInWithPopup(provider)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  render() {
    const { loading } = UserStore.userData
    // tiap ngetik ngerender terus
    return (
      <View style={styles.mainContainer}>
        <Image
           style={{width: '100%', height: '60%', marginTop: 24, marginLeft: 8, marginRight: 8}}
           source={background}
        ></Image>
        <View style={styles.container}>
          <Loader loading={loading}/>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={(email) => this.setState({email})}
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType='next'
            placeholder='Enter your email address'
            placeholderTextColor='rgba(225,225,225,0.7)'
          />

          <TextInput
            style={styles.input}
            returnKeyType='go'
            ref={(input) => this.passwordInput = input}
            onChangeText={(password) => this.setState({password})}
            placeholder='Enter your password'
            placeholderTextColor='rgba(225,225,225,0.7)'
            secureTextEntry
          />
          
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.submitLogin}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.googleLogin}
          >
            <Text style={styles.buttonText}>Connect with Google</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
            
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 12
  },
  container: {
    backgroundColor: '#F1F8E9',
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 8,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height:40,
    width: 320,
    backgroundColor: 'rgba(225,225,225,0.2)',
    padding: 10,
    marginRight: 8,
    marginLeft: 8,
    marginTop: 2,
    marginBottom: 2,
    color: '#fff',
    borderRadius: 4
  },
  buttonContainer: {
    backgroundColor: '#20b2aa',
    paddingVertical: 15,
    marginBottom: 8,
    borderRadius: 4,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default Login