import React, { Component } from 'react';
import { View, StyleSheet, Image, AsyncStorage, ImageBackground} from 'react-native'
import UserStore from '../store/UserStore'
import FarmStore from '../store/FarmStore'
import { User } from '../store/firebase'
import { observer } from 'mobx-react'

const background = require('../assets/logo/Drawing1-ModelEdit.png')
const imageBackground = require('../assets/logo/3147-compressor.jpg')


class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  static navigationOptions = {
    header: null
  }
  componentDidMount = async() => {
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
    }, 2000)
  }
  render() {
    return (
    //   <ImageBackground 
    //   source={imageBackground}
    //   style={{width: '100%', height: '100%'}}
    // >
        <View style={styles.mainContainer}>
            <View style={styles.container}>
            <Image
              style={styles.imageContainer}
              source={background}
            />
            </View>
        </View>
      // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#A1887F',
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
    height: 260,
  },
})


export default WelcomeScreen;