import React, { Component } from 'react';
import { View, StyleSheet, Image} from 'react-native'

const background = require('../assets/logo/Drawing1-Model3.png')

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  static navigationOptions = {
    header: null
  }
  componentDidMount () {
    setTimeout(() => {
      this.props.navigation.push('Login')
    }, 3000)
  }
  render() {
    return (
      <View style={styles.mainContainer}>
          <View      style={styles.container}>
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