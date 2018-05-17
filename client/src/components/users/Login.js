import React, { Component } from 'react'
import { 
  View, Text, TextInput,
  StyleSheet, TouchableOpacity, Alert
} from 'react-native'
import { inject, observer } from 'mobx-react'

import { User } from '../../store/firebase'
import SignUp from './SignUp'
// import Container from '../customs/Container'
// import Label from '../customs/Label'
// import UserStore from '../../store/UserStore'

// @inject('UserStore')
class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  submitLogin = () => {
    let email = this.state.email
    let password = this.state.password
    
    if (!email) {
      Alert.alert('Sorry!','Please fill your Email')
    } else if (!password) {
      Alert.alert('Sorry!','Please fill your Password')
    } else {
      this.firebaseLogin({email, password})
    }
  }

  firebaseLogin = (data) => {
    console.log(this.state)
    User.signInAndRetrieveDataWithEmailAndPassword(data.email, data.password)
      .then(user => {
        console.log(user)
        if (user) {
          this.props.navigation.navigate('Home')
        }
      })
      .catch(err => console.log(err))
  }

  // tambahan kalo bisa
  googleLogin = () => {
    console.log('login Google')
  }
  
  render() {
    // tiap ngetik ngerender terus
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize='none'
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={(email) => this.setState({email})}
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          placeholder='Email'
          placeholderTextColor='rgba(225,225,225,0.7)'
        />

        <TextInput
          style={styles.input}
          returnKeyType='go'
          ref={(input) => this.passwordInput = input}
          onChangeText={(password) => this.setState({password})}
          placeholder='Password'
          placeholderTextColor='rgba(225,225,225,0.7)'
          secureTextEntry
        />
        
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.submitLogin}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.googleLogin}
        >
          <Text style={styles.buttonText}>Connect with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151e2d',
    padding: 20,
    width: '100%'
  },
  input: {
    height:40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    marginBottom: 4
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default Login