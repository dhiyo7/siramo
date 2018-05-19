import React, { Component } from 'react'
import {
  View, 
  Text, 
  StyleSheet,
  ScrollView
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
      <ScrollView>
        <View style={styles.mainContainer}>
          <FarmDetail />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F1F8E9'
  }
})

export default Home