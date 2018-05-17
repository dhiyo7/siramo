import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity, 
  Alert
} from 'react-native'
import { User } from '../../store/firebase'


class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      conPassword: ''
    }
  }

  firebaseSignUp = (data) => {
    console.log(this.state)
    // nanti harus bikin loading
    User.createUserAndRetrieveDataWithEmailAndPassword(data.email, data.password)
      .then(user => {
        console.log(user)
        // nanti bikin db baru di firebase kalo mau ada name alamat dll
        // kalo berhasil langsung pindah ke home
      })
      .catch(err => {
        Alert.alert(err.code, err.message)
      })
  }

  submitSignUp = () => {
    let email = this.state.email
    let password = this.state.password
    let conPassword = this.state.conPassword

    if (!email) {
      Alert.alert('Sorry!','Please fill your Email')
    } else if (!password) {
      Alert.alert('Sorry!','Please fill your Password')
    } else if (!conPassword) {
      Alert.alert('Sorry!','Please fill your Password Confirmation')
    } else if (password !== conPassword) {
      Alert.alert('Sorry!','Password does not match')
    } else {
      this.firebaseSignUp({email, password})
    }
  }

  render() {
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
          placeholderTextColor='rgba(255,255,255,0.7)'
        />

        <TextInput 
          style={styles.input}
          returnKeyType='go'
          ref={(input) => this.passwordInput = input}
          onChangeText={(password) => this.setState({password})}
          onSubmitEditing={() => this.conPassInput.focus()}
          placeholder='Password'
          placeholderTextColor='rgba(225,225,225,0.7)'
          secureTextEntry
        />

        <TextInput 
          style={styles.input}
          returnKeyType='go'
          ref={(input) => this.conPassInput = input}
          onChangeText={(conPassword) => this.setState({conPassword})}
          placeholder='Confirm Password'
          placeholderTextColor='rgba(225,225,225,0.7)'
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.submitSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Cancel</Text>
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

export default SignUp