import React, { Component } from 'react'
import { 
  View,
  StyleSheet, Image, ImageBackground
} from 'react-native'

const background = require('../../assets/logo/SiramoEdit.png')
const backgroundImage = require('../../assets/logo/3147.jpg')

class SiramoLogo extends Component {

  render() {
    return (
      <ImageBackground 
      source={backgroundImage}
      style={{width: '100%', height: '100%'}}
    >
        <View style={styles.mainContainer}>
        
              <Image
              style={styles.imageContainer}
                  source={background}
              />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  imageContainer: {
    width: 180,
    height: 40,
    marginBottom: 4,
    marginTop: 4,
  },
})

export default SiramoLogo;