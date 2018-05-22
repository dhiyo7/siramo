import React, { Component } from 'react'
import { 
  View, Text, TextInput, BackHandler,
  StyleSheet, TouchableOpacity, Alert, Image, ImageBackground
} from 'react-native'
import { inject, observer } from 'mobx-react'
import Loader from '../customs/Loader'
// import { User, Fire } from '../../store/firebase'
// import SignUp from './SignUp'
import UserStore from '../../store/UserStore'

const background = require('../../assets/logo/Drawing1-ModelEdit.png')
const emailIcon = require('../../assets/logo/584856b4e0bb315b0f7675ac.png')
const passwordIcon = require('../../assets/logo/lock_512pxGREY.png')

@observer class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      props: props
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
  }

  handleBackButtonClick() {
      return true
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
 
  render() {
    const { loading } = UserStore.userData
    // tiap ngetik ngerender terus
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
            style={styles.imageContainer}
            source={background}
          />
          <Loader loading={loading}/>
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
                placeholder='Enter your email address'
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
              placeholder='Enter your password'
              placeholderTextColor='#3E2723'
              secureTextEntry
            />
          </View>
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
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
})

export default Login