import React, { Component } from 'react'
import { 
  View,
  StyleSheet, Image
} from 'react-native'

const background = require('../../assets/logo/SiramoEdit.png')

class SiramoLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <View style={styles.mainContainer}>
          <Image
          style={styles.imageContainer}
              source={background}
          />
      </View>
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