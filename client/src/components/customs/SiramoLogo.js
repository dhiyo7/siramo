import React, { Component } from 'react'
import { 
  View,
  StyleSheet, Image, ImageBackground
} from 'react-native'

const background = require('../../assets/logo/ScreenShot.png')
const backgroundImage = require('../../assets/logo/3147-compressor.jpg')

class SiramoLogo extends Component {

  render() {
    return (
    //   <ImageBackground 
    //   source={backgroundImage}
    //   style={{width: '100%', height: '100%'}}
    // >
      <View style={styles.mainContainer}>
        <Image
          style={styles.imageContainer}
          source={background}
        />
      </View>
      // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
    padding: 16,
    paddingLeft: 0,
    height: 40,
    marginLeft: 20
  },
  imageContainer: {
    width: 160,
    height: 40,
  },
})

export default SiramoLogo;