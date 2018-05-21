import React, { Component } from 'react';
import { View, StyleSheet, Image, AsyncStorage} from 'react-native'
import UserStore from '../store/UserStore'
import FarmStore from '../store/FarmStore'
import { User } from '../store/firebase'
import { observer } from 'mobx-react'

const background = require('../assets/logo/Drawing1-Model3.png')

@observer class WelcomeScreen extends Component {
  
  static navigationOptions = {
    header: null
  }
  componentDidMount = () => {
    setTimeout( async () => {
      let uid = await AsyncStorage.getItem('userId')
      let email = await AsyncStorage.getItem('email')
      await UserStore.assignUserData({
        uid,
        email
      })
      await FarmStore.getFarmData()
      uid == null?
      this.props.navigation.push('Login'):this.props.navigation.push('Home')
    }, 3000)
  }
  render() {
    return (
      <View style={styles.mainContainer}>
          <View style={styles.container}>
          <Image
            style={styles.imageContainer}
            source={background}
          />
          </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#A1887F',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  container: {
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 310,
    height: 230,
  },
})


export default WelcomeScreen;