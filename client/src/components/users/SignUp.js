import React, { Component } from 'react'
import {
  View, Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity, 
  Alert,
  ScrollView
} from 'react-native'
import { inject, observer } from 'mobx-react'
import { User } from '../../store/firebase'
import UserStore from '../../store/UserStore'
import Loader from '../customs/Loader';

const background = require('../../assets/logo/Drawing1-ModelEdit.png')
const emailIcon = require('../../assets/logo/584856b4e0bb315b0f7675ac.png')
const passwordIcon = require('../../assets/logo/lock_512pxGREY.png')

@inject('UserStore')
@observer class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      conPassword: ''
    }
  }

  static navigationOptions = {
    header: null
  }

  // firebaseSignUp = (data) => {
  //   console.log(this.state)
  //   // nanti harus bikin loading
  //   User.createUserAndRetrieveDataWithEmailAndPassword(data.email, data.password)
  //     .then(user => {
  //       console.log(user)
  //       // nanti bikin db baru di firebase kalo mau ada name alamat dll
  //       // kalo berhasil langsung pindah ke home
  //     })
  //     .catch(err => {
  //       Alert.alert(err.code, err.message)
  //     })
  // }
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
      let navigation = this.props.navigation
      UserStore.firebaseSignUp({email, password}, navigation)
    }
  }

  render() {
    const { loading } = UserStore.userData
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
        <Image
                          style={styles.imageContainer}
                          source={background}
          />
        <Loader loading={loading} />
        <View style={styles.inputBox} >
            <Image
              style={styles.iconBox}         
              source={emailIcon} />
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={(email) => this.setState({email})}
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType='next'
            placeholder='Enter your new email'
            placeholderTextColor='#3E2723'
          />
        </View>
        <View style={styles.inputBox}> 
            <Image
              style={styles.iconBox}         
              source={passwordIcon} />
          <TextInput 
            style={styles.input}
            returnKeyType='go'
            ref={(input) => this.passwordInput = input}
            onChangeText={(password) => this.setState({password})}
            onSubmitEditing={() => this.conPassInput.focus()}
            placeholder='Enter your new password'
            placeholderTextColor='#3E2723'
            secureTextEntry
          />
        </View>
        <View style={styles.inputBox}> 
            <Image
              style={styles.iconBox}         
              source={passwordIcon} />
          <TextInput 
            style={styles.input}
            returnKeyType='go'
            ref={(input) => this.conPassInput = input}
            onChangeText={(conPassword) => this.setState({conPassword})}
            placeholder='Confirm your new password'
            placeholderTextColor='#3E2723'
            secureTextEntry
          />
        </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.submitSignUp}
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonCancelContainer}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>CANCEL</Text>
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
    height: '100%',
    marginRight: 8,
    marginLeft: 8,
    alignItems: 'center',
    paddingTop: 50,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 8
  },
  inputBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 4,
    width: 400,
  },
  iconBox: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height:40,
    width: 280,
    backgroundColor: 'rgba(225,225,225,0.2)',
    padding: 6,
    marginRight: 4,
    marginLeft: 4,
    marginTop: 2,
    marginBottom: 2,
    color: '#8D6E63',
    borderRadius: 4,
    fontSize: 16

  },
  buttonContainer: {
    backgroundColor: '#33691E',
    paddingVertical: 15,
    marginBottom: 8,
    borderRadius: 4,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancelContainer: {
    backgroundColor: '#BDBDBD',
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

export default SignUp