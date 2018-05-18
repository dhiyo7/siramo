import React, { Component } from 'react'
import {
  View, Text, StyleSheet
} from 'react-native'

// Sementara
import FarmDetail from './farms/FarmDetail'

class Home extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Text> Halaman Home ini ? </Text>
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