import React, { Component } from 'react'
import {
  View, Text, StyleSheet, Image
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Sementara
import FarmDetail from './farms/FarmDetail'

class Home extends Component {

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: () => (
      <Ionicons name="md-home" size={24} color="green" />
    )
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <FarmDetail />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#151e2d',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})

export default Home